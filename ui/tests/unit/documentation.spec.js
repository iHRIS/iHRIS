import { shallowMount } from "@vue/test-utils";
import Documentation from "@/views/Documentation.vue";

describe("Documentation.vue", () => {
  it("Says documentation", () => {
    const wrapper = shallowMount(Documentation, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll("v-container-stub")).toHaveLength(1);
    expect(wrapper.find("v-container-stub").text()).toBe("Documentation");
  });
});
