import { shallowMount } from "@vue/test-utils";
import ReviewApplication from "@/views/People/ReviewApplication.vue";

describe("ReviewApplication.vue", () => {
  it("Says review application", () => {
    const wrapper = shallowMount(ReviewApplication, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll('v-container-stub')).toHaveLength(1);
    expect(wrapper.find('v-container-stub').text()).toBe('Review Application');
  });
});
