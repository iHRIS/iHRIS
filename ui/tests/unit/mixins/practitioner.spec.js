import axios from "axios";
import { mount } from "@vue/test-utils";
import Practitioner from "@/mixins/Practitioner";

jest.mock("axios");
jest.mock("@/config/config.json", () => ({
  backend: "fake backend"
}));

const Component = {
  template: '<div class="mi-component"></div>'
};

let wrapper;
let response;

describe("Practitioner", () => {
  beforeEach(() => {
    wrapper = mount(Component, {
      mixins: [Practitioner]
    });

    response = {
      data: {
        snapshot: {
          element: []
        }
      }
    };
  });

  test("Default response for get sections includes on section", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    let sections = await wrapper.vm.getSections();

    expect(sections.length).toBe(1);
    expect(sections[0].id).toBe("iHRISPractitionerRole.workHistory");
  });

  test("Failed get sections returns empty array", async () => {
    let failedPromise = new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Error")), 0)
    );
    failedPromise.catch(() => {
      return;
    });

    axios.get.mockImplementationOnce(() => failedPromise);

    let sections = await wrapper.vm.getSections().catch(err => {
      return err;
    });

    expect(sections.length).toBe(0);
    expect(sections).toEqual([]);
  });

  test("Certain fields are ignored", async () => {
    response.data.snapshot.element = [
      { id: "anything.extension" },
      { id: "anything.id" },
      { id: "anything.url" },
      { id: "anything.value[x]" },
      { id: "Practitioner" },
      { id: "Practitioner.meta" },
      { id: "Practitioner.active" },
      { id: "should pass", max: 0 },
      { id: "containsqualificationsomewhere" },
      { id: "should see this qualification" }
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    let sections = await wrapper.vm.getSections();

    let expected = [
      "should see this qualification",
      "iHRISPractitionerRole.workHistory"
    ];

    expect(sections.length).toBe(2);

    for (var i in sections) {
      let section = sections[i];

      expect(expected.indexOf(section.id) !== -1).toBeTruthy();
    }
  });

  test("Non-excluded sections are added", async () => {
    response.data.snapshot.element = [
      { id: "one" },
      { id: "two" },
      { id: "three" },
      { id: "four" },
      { id: "five" }
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    let sections = await wrapper.vm.getSections();

    let expected = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "iHRISPractitionerRole.workHistory"
    ];

    expect(sections.length).toBe(6);

    for (var i in sections) {
      let section = sections[i];

      expect(expected.indexOf(section.id) !== -1).toBeTruthy();
    }
  });
});
