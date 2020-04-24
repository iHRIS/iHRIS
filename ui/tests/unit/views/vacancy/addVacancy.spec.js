import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

import Add from "@/views/Vacancy/Add.vue";

// Utilities
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
document.body.setAttribute("data-app", true);

let wrapper;

describe("Add.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();

    wrapper = mount(Add, {
      localVue,
      vuetify
    });
  });

  it("Is a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Says add vacancy in the title", () => {
    expect(wrapper.findAll(".v-card__title")).toHaveLength(1);
    expect(wrapper.find(".v-card__title").text()).toBe("Add Vacancy");
  });
});
