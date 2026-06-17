#!/usr/bin/env node
/*
 * One-time, idempotent backfill of the CHW position/location summary
 * (ihris-chw-position-summary) onto existing CHW Practitioners.
 *
 * For every active CHW PractitionerRole it recomputes Facility/Cadre/District/
 * Sub-County/Parish/Village (Parish/Village from the role; District/Sub-County from
 * the Facility's partOf chain) and writes the summary extension onto the linked
 * Practitioner (replacing any existing one). Safe to re-run.
 *
 * Usage:
 *   node backfillChwPositionSummary.js --server http://localhost:8083/fhir
 */
const axios = require('axios')

const SUMMARY_URL = 'http://ihris.org/fhir/StructureDefinition/ihris-chw-position-summary'
const ROLE_PROFILE = 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role-chw'

function getArg(name, fallback) {
  const idx = process.argv.indexOf('--' + name)
  return idx > -1 ? process.argv[idx + 1] : fallback
}

const server = (getArg('server', 'http://localhost:8083/fhir')).replace(/\/$/, '')

async function buildSummary(role) {
  const summary = []
  const roleExt = (slice) =>
    role.extension &&
    role.extension.find(
      (e) => e.url === `http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-${slice}`
    )

  const cadre = role.code && role.code[0] && role.code[0].coding && role.code[0].coding[0]
  if (cadre) summary.push({ url: 'cadre', valueCoding: cadre })

  let village = roleExt('village')
  village = village && village.valueString
  let parish = roleExt('parish')
  parish = parish && parish.valueString

  const loc = Array.isArray(role.location) ? role.location[0] : role.location
  const facilityRef = loc && loc.reference
  let district, subcounty
  const ancestors = []
  if (facilityRef) {
    const facilityId = facilityRef.split('/').pop()
    summary.push({ url: 'facility', valueReference: { reference: facilityRef } })
    try {
      const chain = await axios.get(
        `${server}/Location?_id=${facilityId}&_include:iterate=Location:partof&_count=50`
      )
      for (const entry of (chain.data.entry || [])) {
        const l = entry.resource
        if (!l || l.resourceType !== 'Location') continue
        ancestors.push({ url: 'ancestor', valueReference: { reference: `Location/${l.id}` } })
        if (l.id === facilityId) {
          if (l.name) summary.push({ url: 'facilityName', valueString: l.name })
          continue
        }
        const level =
          l.type && l.type[0] && l.type[0].coding && l.type[0].coding[0] && l.type[0].coding[0].code
        if (level === 'district') district = l.name
        else if (level === 'subcounty') subcounty = l.name
        else if (level === 'parish' && !parish) parish = l.name
        else if (level === 'village' && !village) village = l.name
      }
    } catch (err) {
      console.error('  facility chain failed for', facilityRef, '-', err.message)
    }
  }

  if (district) summary.push({ url: 'district', valueString: district })
  if (subcounty) summary.push({ url: 'subcounty', valueString: subcounty })
  if (parish) summary.push({ url: 'parish', valueString: parish })
  if (village) summary.push({ url: 'village', valueString: village })
  for (const a of ancestors) summary.push(a)

  return summary.length ? { url: SUMMARY_URL, extension: summary } : null
}

async function materialize(role, counters) {
  const practitionerRef = role.practitioner && role.practitioner.reference
  if (!practitionerRef) {
    counters.skipped++
    return
  }
  const practitionerId = practitionerRef.split('/').pop()
  const summary = await buildSummary(role)
  const practitioner = (await axios.get(`${server}/Practitioner/${practitionerId}`)).data
  practitioner.extension = (practitioner.extension || []).filter((e) => e.url !== SUMMARY_URL)
  if (summary) practitioner.extension.push(summary)
  await axios.put(`${server}/Practitioner/${practitionerId}`, practitioner, {
    headers: { 'Content-Type': 'application/fhir+json' },
  })
  counters.updated++
}

async function main() {
  console.log('Backfilling CHW position summary against', server)
  let url = `${server}/PractitionerRole?_profile=${encodeURIComponent(ROLE_PROFILE)}&active=true&_count=100`
  const counters = { updated: 0, skipped: 0 }
  let page = 0
  while (url) {
    const bundle = (await axios.get(url)).data
    page++
    console.log(`Page ${page}: ${bundle.entry ? bundle.entry.length : 0} roles`)
    for (const entry of (bundle.entry || [])) {
      if (entry.resource && entry.resource.resourceType === 'PractitionerRole') {
        try {
          await materialize(entry.resource, counters)
        } catch (err) {
          console.error('  failed role', entry.resource.id, '-', err.message)
        }
      }
    }
    const next = bundle.link && bundle.link.find((l) => l.relation === 'next')
    url = next ? next.url : null
  }
  console.log(`Done. Updated ${counters.updated}, skipped ${counters.skipped}.`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
