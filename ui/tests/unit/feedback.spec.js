import { shallowMount } from "@vue/test-utils";
import Feedback from "@/views/Feedback.vue";

describe("Feedback.vue", () => {
  it("Says feedback", () => {
    const wrapper = shallowMount(Feedback, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll("v-container-stub")).toHaveLength(1);
    expect(wrapper.find("v-container-stub").text()).toBe("Feedback");
  });
});
