import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  it("Says dashboard", () => {
    const wrapper = shallowMount(Home, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll('v-container-stub')).toHaveLength(1);
    expect(wrapper.find('v-container-stub').text()).toBe('Dashboard');
  });
});
