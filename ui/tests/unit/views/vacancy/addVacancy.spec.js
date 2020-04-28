import Vue from "Vue";
import Vuetify from "vuetify";

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

  it("Has a form", () => {
    let form = wrapper.find("form");
    expect(form.exists()).toBeTruthy();
  });

  it("Has an alert", () => {
    let alertComponent = wrapper.find(".v-alert");
    expect(alertComponent.exists()).toBeTruthy();
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

  test("Alert is hidden by default", () => {
    let alertComponent = wrapper.find(".v-alert");
    expect(alertComponent.isVisible()).toBeFalsy();
  });

  test("Alert is shown if fields fail to throw", async () => {
    let describe = jest.fn();
    describe.mockReturnValue(Promise.reject({}));

    wrapper = mount(Add, {
      localVue,
      vuetify,
      methods: { describe }
    });

    await wrapper.vm.created();
    await Vue.nextTick();

    let alertComponent = wrapper.find(".v-alert");
    expect(alertComponent.isVisible()).toBeTruthy();
  });

  test("No fields are shown if error loading", async () => {
    let describe = jest.fn();
    describe.mockReturnValue(Promise.reject({}));

    wrapper = mount(Add, {
      localVue,
      vuetify,
      methods: { describe }
    });

    await wrapper.vm.created();

    let fields = wrapper.vm.fields;
    expect(fields.length).toBe(0);
  });

  test("Alert is shown when variable changes", done => {
    wrapper.setData({ showAlert: true });

    Vue.nextTick(() => {
      let alertComponent = wrapper.find(".v-alert");
      expect(wrapper.vm.showAlert).toBeTruthy();
      expect(alertComponent.isVisible()).toBeTruthy();
      done();
    });
  });
});
