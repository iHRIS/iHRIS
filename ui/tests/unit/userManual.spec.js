import { shallowMount } from "@vue/test-utils";
import UserManual from "@/views/UserManual.vue";

describe("UserManual.vue", () => {
  it("Says user manual", () => {
    const wrapper = shallowMount(UserManual, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll("v-container-stub")).toHaveLength(1);
    expect(wrapper.find("v-container-stub").text()).toBe("User Manual");
  });
});
