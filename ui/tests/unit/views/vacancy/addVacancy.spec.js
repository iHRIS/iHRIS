import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

import Add from "@/views/Vacancy/Add.vue";

// Utilities
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
document.body.setAttribute("data-app", true);

let wrapper;

const created = jest.fn();

describe("Add.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();

    wrapper = mount(Add, {
      localVue,
      vuetify,
      methods: { created }
    });
  });

  it("Is a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Says add vacancy in the title", () => {
    expect(wrapper.findAll(".v-card__title")).toHaveLength(1);
    expect(wrapper.find(".v-card__title").text()).toBe("Add Vacancy");
  });

  it("Does not render form by default", () => {
    let fields = wrapper.vm.fields;
    expect(fields).toEqual([]);
  });

  it("Updates fields based on axios response", async () => {
    let describe = jest.fn();
    describe.mockReturnValue(
      Promise.resolve({
        id: "id",
        fields: [
          {
            type: "string"
          },
          {
            type: "string"
          }
        ]
      })
    );

    wrapper = mount(Add, {
      localVue,
      vuetify,
      methods: { describe }
    });

    await wrapper.vm.created();

    let fields = wrapper.vm.fields;
    expect(fields.length).toBe(2);
  });
});
