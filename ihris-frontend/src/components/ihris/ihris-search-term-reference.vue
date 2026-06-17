<template>
  <!-- Tree picker: drill down the Location partOf hierarchy and pick any node. -->
  <v-menu
    v-if="displayType === 'tree'"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
    max-height="500px"
    class="ma-2"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="displayValue"
        :label="$t(`App.fhir-resources-texts.${label}`)"
        class="ma-2"
        readonly
        outlined
        dense
        hide-details
        clearable
        :loading="loading"
        v-on="on"
        @click:clear="clearSearch()"
      ></v-text-field>
    </template>
    <v-card>
      <v-treeview
        :active.sync="active"
        :items="items"
        :load-children="fetchChildren"
        :open.sync="open"
        item-key="id"
        item-text="name"
        activatable
        :multiple-active="false"
        selection-type="independent"
        :loading="loading"
      >
        <template slot="label" slot-scope="{ item }">
          {{ item.name }}
        </template>
      </v-treeview>
    </v-card>
  </v-menu>

  <!-- Default: flat autocomplete over the target resource by name. -->
  <v-autocomplete
    v-else
    v-model="value"
    :items="items"
    :search-input.sync="search"
    :loading="loading"
    :label="$t(`App.fhir-resources-texts.${label}`)"
    class="ma-2"
    outlined
    dense
    hide-details
    hide-no-data
    cache-items
    clearable
    item-text="text"
    item-value="value"
    @change="updateSearch()"
    @click:clear="clearSearch()"
  ></v-autocomplete>
</template>

<script>
const querystring = require("querystring")

export default {
  name: "ihris-search-term-reference",
  // label: display label; expression: FHIR search parameter (reference type);
  // target: resource type to search (e.g. "Location"); displayType: "tree" for a
  // hierarchical partOf picker, otherwise a flat name autocomplete;
  // rootType: for tree mode, the Location.type code to start at (e.g. "district").
  // Without it the tree starts at top-level (partOf-missing) nodes.
  props: ["label", "expression", "target", "displayType", "rootType"],
  data: function () {
    return {
      loading: false,
      items: [],
      value: null,
      search: null,
      awaitingSearch: false,
      // tree state
      menu: false,
      active: [],
      open: [],
      treeLookup: {},
      displayValue: null,
    }
  },
  computed: {
    resource() {
      return this.target || "Location"
    },
  },
  created: function () {
    if (this.displayType === "tree") {
      this.setupTreeItems()
    }
  },
  watch: {
    search(val) {
      if (this.displayType === "tree") return
      if (!val || val.length < 2) return
      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.querySelections(this.search)
          this.awaitingSearch = false
        }, 500)
      }
      this.awaitingSearch = true
    },
    active() {
      if (this.active.length) {
        this.value = this.active[0]
        this.displayValue = this.treeLookup[this.value]
        this.$emit("termChange", this.expression, this.value)
      }
      this.menu = false
    },
  },
  methods: {
    // ---- flat autocomplete ----
    querySelections(query) {
      this.loading = true
      let url =
        "/fhir/" +
        this.resource +
        "?status=active&_count=20&name:contains=" +
        encodeURIComponent(query)
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let items = []
          if (data.entry) {
            for (let entry of data.entry) {
              let res = entry.resource
              let name = res.name || res.id
              let level =
                res.type &&
                res.type[0] &&
                res.type[0].coding &&
                res.type[0].coding[0] &&
                res.type[0].coding[0].display
              items.push({
                text: level ? `${name} (${level})` : name,
                value: res.resourceType + "/" + res.id,
              })
            }
          }
          this.items = items
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    updateSearch() {
      this.$emit("termChange", this.expression, this.value || [])
    },
    clearSearch() {
      this.value = null
      this.displayValue = null
      this.active = []
      this.$emit("termChange", this.expression, [])
    },
    // ---- tree picker (ported from fhir-reference.vue) ----
    setupTreeItems() {
      this.loading = true
      this.items = []
      // Start the tree at a specific admin level (e.g. district) when given; the
      // Location data includes every world country at partOf-missing, which is not a
      // useful root. Otherwise fall back to top-level nodes.
      let params = this.rootType
        ? { type: this.rootType, _count: 500 }
        : { "partof:missing": true, _count: 500 }
      let url = "/fhir/" + this.resource + "?_sort=name&" + querystring.stringify(params)
      this.addItems(url, this.items)
    },
    nodeName(resource) {
      let name = resource.name || resource.id
      let level =
        resource.type &&
        resource.type[0] &&
        resource.type[0].coding &&
        resource.type[0].coding[0] &&
        resource.type[0].coding[0].display
      return level ? `${name} (${level})` : name
    },
    // Mark a node as expandable if it has partOf children (jurisdictions or facilities).
    checkChildren(item) {
      let url =
        "/fhir/" +
        this.resource +
        "?_sort=name&_summary=count&" +
        querystring.stringify({ partof: item.id })
      return new Promise((resolve) => {
        fetch(url)
          .then((response) => (response.ok ? response.json() : null))
          .then((data) => {
            if (data && data.total && data.total > 0) item.children = []
            resolve()
          })
          .catch(() => resolve())
      })
    },
    addItems(url, items) {
      fetch(url)
        .then((response) => (response.ok ? response.json() : null))
        .then(async (data) => {
          if (data && data.entry && data.entry.length > 0) {
            for (let entry of data.entry) {
              let item = {
                id: entry.resource.resourceType + "/" + entry.resource.id,
                name: this.nodeName(entry.resource),
              }
              await this.checkChildren(item)
              this.treeLookup[item.id] = item.name
              items.push(item)
            }
          }
          let next = data && data.link && data.link.find((l) => l.relation === "next")
          if (next) {
            this.addItems(next.url, items)
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    fetchChildren(item) {
      let url =
        "/fhir/" + this.resource + "?" + querystring.stringify({ partof: item.id, _count: 500 })
      this.loading = true
      this.addItems(url, item.children)
      return new Promise((resolve) => {
        let count = 0
        const checkLoading = () => {
          if (!this.loading || count++ > 100) resolve()
          else setTimeout(checkLoading, 200)
        }
        checkLoading()
      })
    },
  },
}
</script>
