import axios from "axios";
import { mount } from "@vue/test-utils";
import Dashboards from "@/mixins/Dashboards";

jest.mock('axios');
jest.mock('@/config/config.json', () => ({
  backend: "fake backend",
  kibana: "fake kibana link"
}));

const Component = {
  template: '<div class="mi-component"></div>'
};

let wrapper;

describe("Dashboards", () => {
  beforeEach(() => {
    wrapper = mount(Component, {
      mixins: [Dashboards]
    });
  });

  test("Default state has no dashboards", () => {
    let dashboards = wrapper.vm.dashboards;
    expect(dashboards).toEqual([]);
  });

  test("Add dashboard adds new dashboard", async () => {
    const response = {
      data: {
        saved_objects: [{
          id: "one"
        }]
      }
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    await wrapper.vm.addDashboard("single dashboard");
    let dashboards = wrapper.vm.dashboards;
    let expected = [
      {
        id: "one",
        iframeLink: "fake kibana link/app/kibana#/dashboard/one?embed=true"
      }
    ];

    expect(dashboards).toEqual(expected);

    expect(axios.get).toHaveBeenCalledWith(
      "fake backend/dashboard/n/single dashboard"
    );
  });

  test("Add dashboard adds multiple dashboards if returned", async () => {
    const response = {
      data: {
        saved_objects: [
          { id: "two" },
          { id: "three" }
        ]
      }
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    await wrapper.vm.addDashboard("multiple dashboards");

    let dashboards = wrapper.vm.dashboards;
    let expected = [
      {
        id: "two",
        iframeLink: "fake kibana link/app/kibana#/dashboard/two?embed=true"
      },
      {
        id: "three",
        iframeLink: "fake kibana link/app/kibana#/dashboard/three?embed=true"
      }
    ];

    expect(dashboards).toEqual(expected);
    expect(axios.get).toHaveBeenCalledWith(
      "fake backend/dashboard/n/multiple dashboards"
    );
  });

  test("Add dashboard failure does not add new dashboard", async () => {
    let dashboards = wrapper.vm.dashboards;

    expect(dashboards.length).toEqual(0);

    // now fail to add a dashboard
    let failedPromise = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 0));
    failedPromise.catch(error => { return; });

    axios.get.mockImplementationOnce(() => failedPromise);

    await wrapper.vm.addDashboard("failed dashboard");

    dashboards = wrapper.vm.dashboards;

    expect(dashboards.length).toEqual(0);
  });

  test("Multiple calls to add dashboards adds more", async () => {
    const response = {
      data: {
        saved_objects: [
          { id: "four" }
        ]
      }
    };

    const secondCall = {
      data: {
        saved_objects: [
          { id: "five" }
        ]
      }
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(response))
      .mockImplementationOnce(() => Promise.resolve(secondCall));

    await wrapper.vm.addDashboard("multiple call (one)");

    let dashboards = wrapper.vm.dashboards;

    expect(dashboards.length).toBe(1);

    await wrapper.vm.addDashboard("multiple call (two)");

    dashboards = wrapper.vm.dashboards;

    expect(dashboards.length).toBe(2);
  });

  test("Load all dashboards loads multiple", async () => {
    const response = {
      data: {
        saved_objects: [
          { id: "two" },
          { id: "three" }
        ]
      }
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    await wrapper.vm.loadAllDashboards();

    let dashboards = wrapper.vm.dashboards;
    let expected = [
      {
        id: "two",
        iframeLink: "fake kibana link/app/kibana#/dashboard/two?embed=true"
      },
      {
        id: "three",
        iframeLink: "fake kibana link/app/kibana#/dashboard/three?embed=true"
      }
    ];

    expect(dashboards).toEqual(expected);
    expect(axios.get).toHaveBeenCalledWith(
      "fake backend/dashboard/all"
    );
  });

  test("Load all dashboards erases existing settings", async () => {
    const response = {
      data: {
        saved_objects: [
          { id: "four" }
        ]
      }
    };

    const secondCall = {
      data: {
        saved_objects: [
          { id: "five" },
          { id: "six" }
        ]
      }
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(response))
      .mockImplementationOnce(() => Promise.resolve(secondCall));

    await wrapper.vm.loadAllDashboards();

    let dashboards = wrapper.vm.dashboards;
    let expected = [
      {
        id: "four",
        iframeLink: "fake kibana link/app/kibana#/dashboard/four?embed=true"
      }
    ];

    expect(dashboards).toEqual(expected);

    await wrapper.vm.loadAllDashboards();

    dashboards = wrapper.vm.dashboards;
    expected = [
      {
        id: "five",
        iframeLink: "fake kibana link/app/kibana#/dashboard/five?embed=true"
      },
      {
        id: "six",
        iframeLink: "fake kibana link/app/kibana#/dashboard/six?embed=true"
      }
    ];

    expect(dashboards).toEqual(expected);
  });

  test("When load all dashboards fails, no dashboards are loaded", async () => {
    let dashboards = wrapper.vm.dashboards;

    expect(dashboards.length).toEqual(0);

    // now fail to add a dashboard
    let failedPromise = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 0));
    failedPromise.catch(error => { return; });

    axios.get.mockImplementationOnce(() => failedPromise);

    await wrapper.vm.addDashboard("failed dashboard");

    dashboards = wrapper.vm.dashboards;

    expect(dashboards.length).toEqual(0);
  });

  test("When load all dashboards fail, existing dashboards are not reset", async () => {
    const response = {
      data: {
        saved_objects: [
          { id: "two" },
          { id: "three" }
        ]
      }
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    await wrapper.vm.addDashboard("new dashboards");

    let dashboards = wrapper.vm.dashboards;

    expect(dashboards.length).toBe(2);

    // now fail to add a dashboard
    let failedPromise = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 0));
    failedPromise.catch(error => { return; });

    axios.get.mockImplementationOnce(() => failedPromise);

    let result = await wrapper.vm.loadAllDashboards();

    dashboards = wrapper.vm.dashboards;

    expect(dashboards.length).toEqual(2);
  });
});
