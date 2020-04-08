import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

import BulkUpload from "@/views/BulkUpload.vue";

// Utilities
import {
  mount,
  createLocalVue
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("BulkUpload.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Says bulk upload in the title", () => {
    const wrapper = mount(BulkUpload, {
      localVue,
      vuetify
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll(".v-card__title")).toHaveLength(1);
    expect(wrapper.find(".v-card__title").text()).toBe("Bulk Upload");
  });

  it("Has the correct form fields", () => {
    const wrapper = mount(BulkUpload, {
      localVue,
      vuetify
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.findAll(".v-file-input__text")).toHaveLength(1);
    expect(wrapper.findAll(".v-input--radio-group__input")).toHaveLength(1);

    // we expect 1, but the file input is rendered as a text field as well so it's 2
    expect(wrapper.findAll(".v-text-field")).toHaveLength(2);
  });

  it("File input is disabled by default", () => {
    const wrapper = mount(BulkUpload, {
      localVue,
      vuetify
    });

    expect(wrapper.isVueInstance()).toBeTruthy();

    let fileInput = wrapper.find(".v-file-input");

    expect(fileInput.classes()).toContain("v-input--is-disabled");
  });

  it("File input is enabled when file type is selected", () => {
    const wrapper = mount(BulkUpload, {
      localVue,
      vuetify
    });

    expect(wrapper.isVueInstance()).toBeTruthy();

    wrapper.setData( { fileType: "csv" } );

    let fileInput = wrapper.find(".v-file-input");

    expect(fileInput.classes()).not.toContain("v-input--is-disabled");
  });

  it("Only allows invalid file types initially", () => {
    const wrapper = mount(BulkUpload, {
      localVue,
      vuetify
    });

    expect(wrapper.isVueInstance()).toBeTruthy();

    let allowedExtension = wrapper.vm.allowedFileExtension;
    expect(allowedExtension).toBe(".invalid");
  });

  it("Allows valid file types on select", () => {
    const wrapper = mount(BulkUpload, {
      localVue,
      vuetify
    });

    expect(wrapper.isVueInstance()).toBeTruthy();

    wrapper.setData( { fileType: "csv" } );

    let allowedExtension = wrapper.vm.allowedFileExtension;
    expect(allowedExtension).toBe(".csv");

    wrapper.setData( { fileType: "json" } );

    allowedExtension = wrapper.vm.allowedFileExtension;
    expect(allowedExtension).toBe(".json");
  });
});
