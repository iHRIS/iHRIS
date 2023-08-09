<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2">
  <sch:ns prefix="f" uri="http://hl7.org/fhir"/>
  <sch:ns prefix="h" uri="http://www.w3.org/1999/xhtml"/>
  <!-- 
    This file contains just the constraints for the profile Parameters
    It includes the base constraints for the resource as well.
    Because of the way that schematrons and containment work, 
    you may need to use this schematron fragment to build a, 
    single schematron that validates contained resources (if you have any) 
  -->
  <sch:pattern>
    <sch:title>f:Parameters/f:parameter</sch:title>
    <sch:rule context="f:Parameters/f:parameter">
      <sch:assert test="count(f:resource) &lt;= 0">resource: maximum cardinality of 'resource' is 0</sch:assert>
      <sch:assert test="count(f:part) &lt;= 0">part: maximum cardinality of 'part' is 0</sch:assert>
      <sch:assert test="count(f:value[x]) &lt;= 0">value[x]: maximum cardinality of 'value[x]' is 0</sch:assert>
      <sch:assert test="count(f:resource) &lt;= 0">resource: maximum cardinality of 'resource' is 0</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Parameters/f:parameter/f:value[x] 1</sch:title>
    <sch:rule context="f:Parameters/f:parameter/f:value[x]">
      <sch:assert test="count(f:type) &gt;= 1">type: minimum cardinality of 'type' is 1</sch:assert>
      <sch:assert test="count(f:when) &gt;= 1">when: minimum cardinality of 'when' is 1</sch:assert>
      <sch:assert test="count(f:who) &gt;= 1">who: minimum cardinality of 'who' is 1</sch:assert>
      <sch:assert test="count(f:data) &gt;= 1">data: minimum cardinality of 'data' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Parameters/f:parameter/f:part</sch:title>
    <sch:rule context="f:Parameters/f:parameter/f:part">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:name) &gt;= 1">name: minimum cardinality of 'name' is 1</sch:assert>
      <sch:assert test="count(f:name) &lt;= 1">name: maximum cardinality of 'name' is 1</sch:assert>
      <sch:assert test="count(f:resource) &lt;= 0">resource: maximum cardinality of 'resource' is 0</sch:assert>
      <sch:assert test="count(f:part) &lt;= 0">part: maximum cardinality of 'part' is 0</sch:assert>
    </sch:rule>
  </sch:pattern>
</sch:schema>
