import { shallowMount } from "@vue/test-utils";
import Search from "@/views/People/Search.vue";

describe("Search.vue", () => {
  it("Says search people", () => {
    const wrapper = shallowMount(Search, {
      stubs: ["v-container"]
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll("v-container-stub")).toHaveLength(1);
    expect(wrapper.find("v-container-stub").text()).toBe("Search people");
  });
});
