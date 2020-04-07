import { shallowMount } from "@vue/test-utils";
import GenerateFieldId from "@/mixins/GenerateFieldId";

const Component = {
  template: '<div class="mi-component"></div>'
};

let wrapper = shallowMount(Component, {
  mixins: [GenerateFieldId]
});

describe("GenerateFieldId", () => {
  test("Missing form name returns empty string", () => {
    let fieldId = wrapper.vm.generateFieldId(null, "field");
    expect(fieldId).toBe("");
  });

  test("Missing field name returns empty string", () => {
    let fieldId = wrapper.vm.generateFieldId("form", null);
    expect(fieldId).toBe("");
  });

  test("Uppercase is converted to lower case", () => {
    let fieldId = wrapper.vm.generateFieldId("FORM", "FIELD");
    expect(fieldId).toBe("form_field");
  });

  test("Periods in fields are replaced with underscores (but not form)", () => {
    let fieldId = wrapper.vm.generateFieldId("form.name", "field.property");
    expect(fieldId).toBe("form.name_field_property");
  });
});
