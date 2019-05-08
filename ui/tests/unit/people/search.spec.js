import { shallowMount } from "@vue/test-utils";
import Account from "@/views/People/Search.vue";

describe("Search.vue", () => {
  it("Says search people", () => {
    const wrapper = shallowMount(Account, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll('v-container-stub')).toHaveLength(1);
    expect(wrapper.find('v-container-stub').text()).toBe('Search people');
  });
});
