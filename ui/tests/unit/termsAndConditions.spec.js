import { shallowMount } from "@vue/test-utils";
import TermsAndConditions from "@/views/TermsAndConditions.vue";

describe("TermsAndConditions.vue", () => {
  it("Says terms and conditions", () => {
    const wrapper = shallowMount(TermsAndConditions, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll('v-container-stub')).toHaveLength(1);
    expect(wrapper.find('v-container-stub').text()).toBe('Terms and Conditions');
  });
});
