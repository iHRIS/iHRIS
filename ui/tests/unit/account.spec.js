import { shallowMount } from "@vue/test-utils";
import Account from "@/views/Account.vue";

describe("Account.vue", () => {
  it("Says account", () => {
    const wrapper = shallowMount(Account, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll("v-container-stub")).toHaveLength(1);
    expect(wrapper.find("v-container-stub").text()).toBe("Account");
  });
});
