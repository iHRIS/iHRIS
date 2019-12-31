import { shallowMount } from "@vue/test-utils";
import Settings from "@/views/Settings.vue";

describe("Settings.vue", () => {
  it("Says settings", () => {
    const wrapper = shallowMount(Settings, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll("v-container-stub")).toHaveLength(1);
    expect(wrapper.find("v-container-stub").text()).toBe("Settings");
  });
});
