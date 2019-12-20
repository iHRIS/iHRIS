import { shallowMount } from "@vue/test-utils";
import Add from "@/views/People/Add.vue";

describe("Add.vue", () => {
  it("Says add a person", () => {
    const wrapper = shallowMount(Add, {
      stubs: [
        "v-container",
        "v-btn",
        "v-layout",
        "v-text-field",
        "v-form",
        "v-alert",
        "v-flex"
      ]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll("v-container-stub")).toHaveLength(1);
    expect(wrapper.findAll("h1")).toHaveLength(1);
    expect(wrapper.find("h1").text()).toBe("Add a Person");
  });

  it("Is a form with fields", () => {
    const wrapper = shallowMount(Add, {
      stubs: [
        "v-container",
        "v-btn",
        "v-layout",
        "v-text-field",
        "v-form",
        "v-alert",
        "v-flex"
      ]
    });

    expect(wrapper.findAll("v-form-stub")).toHaveLength(1);
    expect(wrapper.findAll("v-text-field-stub")).toHaveLength(5);
    expect(wrapper.findAll("v-btn-stub")).toHaveLength(2);
  });

  it("Populates form values", () => {
    const wrapper = shallowMount(Add, {
      stubs: [
        "v-container",
        "v-btn",
        "v-layout",
        "v-text-field",
        "v-form",
        "v-alert",
        "v-flex"
      ]
    });

    wrapper.vm.firstName = "Stephen";
    wrapper.vm.surname = "Strange";
    wrapper.vm.otherNames = "Sorcerer Supreme";
    wrapper.vm.nationality = "American";
    wrapper.vm.residence = "Sanctum Santorum";

    const inputs = wrapper.vm.getInputs();

    expect(inputs.firstName).toBe("Stephen");
    expect(inputs.surname).toBe("Strange");
    expect(inputs.otherNames).toBe("Sorcerer Supreme");
    expect(inputs.nationality).toBe("American");
    expect(inputs.residence).toBe("Sanctum Santorum");
  });

  it("Shows alert on an error", () => {
    const wrapper = shallowMount(Add, {
      stubs: [
        "v-container",
        "v-btn",
        "v-layout",
        "v-text-field",
        "v-form",
        "v-alert",
        "v-flex"
      ]
    });

    expect(wrapper.findAll("v-alert-stub")).toHaveLength(1);
    expect(wrapper.find("v-alert-stub").text()).toBe("");

    wrapper.vm.error = "This is an error.";

    expect(wrapper.find("v-alert-stub").text()).toBe("This is an error.");
  });
});
