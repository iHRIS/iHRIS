import { shallowMount } from "@vue/test-utils";
import Account from "@/views/People/View.vue";

describe("View.vue", () => {
  it("Says view person", () => {
    const wrapper = shallowMount(Account, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll('v-container-stub')).toHaveLength(1);
    expect(wrapper.find('v-container-stub').text()).toBe('View Person');
  });
});
