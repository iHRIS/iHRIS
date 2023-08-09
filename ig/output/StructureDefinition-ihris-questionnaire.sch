<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2">
  <sch:ns prefix="f" uri="http://hl7.org/fhir"/>
  <sch:ns prefix="h" uri="http://www.w3.org/1999/xhtml"/>
  <!-- 
    This file contains just the constraints for the profile Questionnaire
    It includes the base constraints for the resource as well.
    Because of the way that schematrons and containment work, 
    you may need to use this schematron fragment to build a, 
    single schematron that validates contained resources (if you have any) 
  -->
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:linkId) &gt;= 1">linkId: minimum cardinality of 'linkId' is 1</sch:assert>
      <sch:assert test="count(f:linkId) &lt;= 1">linkId: maximum cardinality of 'linkId' is 1</sch:assert>
      <sch:assert test="count(f:definition) &lt;= 1">definition: maximum cardinality of 'definition' is 1</sch:assert>
      <sch:assert test="count(f:prefix) &lt;= 1">prefix: maximum cardinality of 'prefix' is 1</sch:assert>
      <sch:assert test="count(f:text) &lt;= 1">text: maximum cardinality of 'text' is 1</sch:assert>
      <sch:assert test="count(f:type) &gt;= 1">type: minimum cardinality of 'type' is 1</sch:assert>
      <sch:assert test="count(f:type) &lt;= 1">type: maximum cardinality of 'type' is 1</sch:assert>
      <sch:assert test="count(f:enableBehavior) &lt;= 1">enableBehavior: maximum cardinality of 'enableBehavior' is 1</sch:assert>
      <sch:assert test="count(f:required) &lt;= 1">required: maximum cardinality of 'required' is 1</sch:assert>
      <sch:assert test="count(f:repeats) &lt;= 1">repeats: maximum cardinality of 'repeats' is 1</sch:assert>
      <sch:assert test="count(f:readOnly) &lt;= 1">readOnly: maximum cardinality of 'readOnly' is 1</sch:assert>
      <sch:assert test="count(f:maxLength) &lt;= 1">maxLength: maximum cardinality of 'maxLength' is 1</sch:assert>
      <sch:assert test="count(f:answerValueSet) &lt;= 1">answerValueSet: maximum cardinality of 'answerValueSet' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:enableWhen</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:enableWhen">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:question) &gt;= 1">question: minimum cardinality of 'question' is 1</sch:assert>
      <sch:assert test="count(f:question) &lt;= 1">question: maximum cardinality of 'question' is 1</sch:assert>
      <sch:assert test="count(f:operator) &gt;= 1">operator: minimum cardinality of 'operator' is 1</sch:assert>
      <sch:assert test="count(f:operator) &lt;= 1">operator: maximum cardinality of 'operator' is 1</sch:assert>
      <sch:assert test="count(f:answer[x]) &gt;= 1">answer[x]: minimum cardinality of 'answer[x]' is 1</sch:assert>
      <sch:assert test="count(f:answer[x]) &lt;= 1">answer[x]: maximum cardinality of 'answer[x]' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:answerOption</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:answerOption">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &gt;= 1">value[x]: minimum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &lt;= 1">value[x]: maximum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:initialSelected) &lt;= 1">initialSelected: maximum cardinality of 'initialSelected' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:initial</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:initial">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &gt;= 1">value[x]: minimum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &lt;= 1">value[x]: maximum cardinality of 'value[x]' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:linkId) &gt;= 1">linkId: minimum cardinality of 'linkId' is 1</sch:assert>
      <sch:assert test="count(f:linkId) &lt;= 1">linkId: maximum cardinality of 'linkId' is 1</sch:assert>
      <sch:assert test="count(f:definition) &lt;= 1">definition: maximum cardinality of 'definition' is 1</sch:assert>
      <sch:assert test="count(f:prefix) &lt;= 1">prefix: maximum cardinality of 'prefix' is 1</sch:assert>
      <sch:assert test="count(f:text) &lt;= 1">text: maximum cardinality of 'text' is 1</sch:assert>
      <sch:assert test="count(f:type) &gt;= 1">type: minimum cardinality of 'type' is 1</sch:assert>
      <sch:assert test="count(f:type) &lt;= 1">type: maximum cardinality of 'type' is 1</sch:assert>
      <sch:assert test="count(f:enableBehavior) &lt;= 1">enableBehavior: maximum cardinality of 'enableBehavior' is 1</sch:assert>
      <sch:assert test="count(f:required) &lt;= 1">required: maximum cardinality of 'required' is 1</sch:assert>
      <sch:assert test="count(f:repeats) &lt;= 1">repeats: maximum cardinality of 'repeats' is 1</sch:assert>
      <sch:assert test="count(f:readOnly) &lt;= 1">readOnly: maximum cardinality of 'readOnly' is 1</sch:assert>
      <sch:assert test="count(f:maxLength) &lt;= 1">maxLength: maximum cardinality of 'maxLength' is 1</sch:assert>
      <sch:assert test="count(f:answerValueSet) &lt;= 1">answerValueSet: maximum cardinality of 'answerValueSet' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:enableWhen</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:enableWhen">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:question) &gt;= 1">question: minimum cardinality of 'question' is 1</sch:assert>
      <sch:assert test="count(f:question) &lt;= 1">question: maximum cardinality of 'question' is 1</sch:assert>
      <sch:assert test="count(f:operator) &gt;= 1">operator: minimum cardinality of 'operator' is 1</sch:assert>
      <sch:assert test="count(f:operator) &lt;= 1">operator: maximum cardinality of 'operator' is 1</sch:assert>
      <sch:assert test="count(f:answer[x]) &gt;= 1">answer[x]: minimum cardinality of 'answer[x]' is 1</sch:assert>
      <sch:assert test="count(f:answer[x]) &lt;= 1">answer[x]: maximum cardinality of 'answer[x]' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:answerOption</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:answerOption">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &gt;= 1">value[x]: minimum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &lt;= 1">value[x]: maximum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:initialSelected) &lt;= 1">initialSelected: maximum cardinality of 'initialSelected' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:initial</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:initial">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &gt;= 1">value[x]: minimum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &lt;= 1">value[x]: maximum cardinality of 'value[x]' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:item</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:item">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:linkId) &gt;= 1">linkId: minimum cardinality of 'linkId' is 1</sch:assert>
      <sch:assert test="count(f:linkId) &lt;= 1">linkId: maximum cardinality of 'linkId' is 1</sch:assert>
      <sch:assert test="count(f:definition) &lt;= 1">definition: maximum cardinality of 'definition' is 1</sch:assert>
      <sch:assert test="count(f:prefix) &lt;= 1">prefix: maximum cardinality of 'prefix' is 1</sch:assert>
      <sch:assert test="count(f:text) &lt;= 1">text: maximum cardinality of 'text' is 1</sch:assert>
      <sch:assert test="count(f:type) &gt;= 1">type: minimum cardinality of 'type' is 1</sch:assert>
      <sch:assert test="count(f:type) &lt;= 1">type: maximum cardinality of 'type' is 1</sch:assert>
      <sch:assert test="count(f:enableBehavior) &lt;= 1">enableBehavior: maximum cardinality of 'enableBehavior' is 1</sch:assert>
      <sch:assert test="count(f:required) &lt;= 1">required: maximum cardinality of 'required' is 1</sch:assert>
      <sch:assert test="count(f:repeats) &lt;= 1">repeats: maximum cardinality of 'repeats' is 1</sch:assert>
      <sch:assert test="count(f:readOnly) &lt;= 1">readOnly: maximum cardinality of 'readOnly' is 1</sch:assert>
      <sch:assert test="count(f:maxLength) &lt;= 1">maxLength: maximum cardinality of 'maxLength' is 1</sch:assert>
      <sch:assert test="count(f:answerValueSet) &lt;= 1">answerValueSet: maximum cardinality of 'answerValueSet' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:item/f:enableWhen</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:item/f:enableWhen">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:question) &gt;= 1">question: minimum cardinality of 'question' is 1</sch:assert>
      <sch:assert test="count(f:question) &lt;= 1">question: maximum cardinality of 'question' is 1</sch:assert>
      <sch:assert test="count(f:operator) &gt;= 1">operator: minimum cardinality of 'operator' is 1</sch:assert>
      <sch:assert test="count(f:operator) &lt;= 1">operator: maximum cardinality of 'operator' is 1</sch:assert>
      <sch:assert test="count(f:answer[x]) &gt;= 1">answer[x]: minimum cardinality of 'answer[x]' is 1</sch:assert>
      <sch:assert test="count(f:answer[x]) &lt;= 1">answer[x]: maximum cardinality of 'answer[x]' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:item/f:answerOption</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:item/f:answerOption">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &gt;= 1">value[x]: minimum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &lt;= 1">value[x]: maximum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:initialSelected) &lt;= 1">initialSelected: maximum cardinality of 'initialSelected' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:item/f:initial</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:item/f:initial">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &gt;= 1">value[x]: minimum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &lt;= 1">value[x]: maximum cardinality of 'value[x]' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:item/f:item</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:item/f:item">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:linkId) &gt;= 1">linkId: minimum cardinality of 'linkId' is 1</sch:assert>
      <sch:assert test="count(f:linkId) &lt;= 1">linkId: maximum cardinality of 'linkId' is 1</sch:assert>
      <sch:assert test="count(f:definition) &lt;= 1">definition: maximum cardinality of 'definition' is 1</sch:assert>
      <sch:assert test="count(f:prefix) &lt;= 1">prefix: maximum cardinality of 'prefix' is 1</sch:assert>
      <sch:assert test="count(f:text) &lt;= 1">text: maximum cardinality of 'text' is 1</sch:assert>
      <sch:assert test="count(f:type) &gt;= 1">type: minimum cardinality of 'type' is 1</sch:assert>
      <sch:assert test="count(f:type) &lt;= 1">type: maximum cardinality of 'type' is 1</sch:assert>
      <sch:assert test="count(f:enableBehavior) &lt;= 1">enableBehavior: maximum cardinality of 'enableBehavior' is 1</sch:assert>
      <sch:assert test="count(f:required) &lt;= 1">required: maximum cardinality of 'required' is 1</sch:assert>
      <sch:assert test="count(f:repeats) &lt;= 1">repeats: maximum cardinality of 'repeats' is 1</sch:assert>
      <sch:assert test="count(f:readOnly) &lt;= 1">readOnly: maximum cardinality of 'readOnly' is 1</sch:assert>
      <sch:assert test="count(f:maxLength) &lt;= 1">maxLength: maximum cardinality of 'maxLength' is 1</sch:assert>
      <sch:assert test="count(f:answerValueSet) &lt;= 1">answerValueSet: maximum cardinality of 'answerValueSet' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:item/f:item/f:enableWhen</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:item/f:item/f:enableWhen">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:question) &gt;= 1">question: minimum cardinality of 'question' is 1</sch:assert>
      <sch:assert test="count(f:question) &lt;= 1">question: maximum cardinality of 'question' is 1</sch:assert>
      <sch:assert test="count(f:operator) &gt;= 1">operator: minimum cardinality of 'operator' is 1</sch:assert>
      <sch:assert test="count(f:operator) &lt;= 1">operator: maximum cardinality of 'operator' is 1</sch:assert>
      <sch:assert test="count(f:answer[x]) &gt;= 1">answer[x]: minimum cardinality of 'answer[x]' is 1</sch:assert>
      <sch:assert test="count(f:answer[x]) &lt;= 1">answer[x]: maximum cardinality of 'answer[x]' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:item/f:item/f:answerOption</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:item/f:item/f:answerOption">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &gt;= 1">value[x]: minimum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &lt;= 1">value[x]: maximum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:initialSelected) &lt;= 1">initialSelected: maximum cardinality of 'initialSelected' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Questionnaire/f:item/f:item/f:item/f:item/f:item/f:initial</sch:title>
    <sch:rule context="f:Questionnaire/f:item/f:item/f:item/f:item/f:item/f:initial">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &gt;= 1">value[x]: minimum cardinality of 'value[x]' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &lt;= 1">value[x]: maximum cardinality of 'value[x]' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
</sch:schema>
