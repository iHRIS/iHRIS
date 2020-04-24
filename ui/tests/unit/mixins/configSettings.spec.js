import { shallowMount } from "@vue/test-utils";
import ConfigSettings from "@/mixins/ConfigSettings";

const Component = {
  template: '<div class="mi-component"></div>'
};

describe("ConfigSettings", () => {
  test("Get backend url returns correct param", () => {
    jest.mock("@/config/config.json", () => ({
      backend: "backend url"
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getBackendUrl();

    expect(result).toBe("backend url");
  });

  test("Missing backend param returns null", () => {
    jest.mock("@/config/config.json", () => ({}));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getBackendUrl();

    expect(result).toBeNull();
  });

  test("No dashboards setting returns empty array", () => {
    jest.mock("@/config/config.json", () => ({}));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getDashboards();
    expect(result).toEqual([]);
  });

  test("Dashboard as string returns array", () => {
    jest.mock("@/config/config.json", () => ({
      dashboards: "One dashboard"
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getDashboards();
    expect(result).toEqual(["One dashboard"]);
  });

  test("Dashboard as array returns array of dashboards", () => {
    jest.mock("@/config/config.json", () => ({
      dashboards: ["One dashboard", "Two dashboards"]
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getDashboards();
    expect(result).toEqual(["One dashboard", "Two dashboards"]);
  });

  test("Get kibana returns correct param", () => {
    jest.mock("@/config/config.json", () => ({
      kibana: "kibana link"
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getKibanaLink();

    expect(result).toBe("kibana link");
  });

  test("Missing kibana param returns null", () => {
    jest.mock("@/config/config.json", () => ({}));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getKibanaLink();

    expect(result).toBeNull();
  });

  test("No mHero setting returns empty array", () => {
    jest.mock("@/config/config.json", () => ({}));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getMHeroDashboards();
    expect(result).toEqual([]);
  });

  test("No mHero dashboards setting returns empty array", () => {
    jest.mock("@/config/config.json", () => ({
      mHero: {}
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getMHeroDashboards();
    expect(result).toEqual([]);
  });

  test("mHero Dashboard as string returns array", () => {
    jest.mock("@/config/config.json", () => ({
      mHero: {
        dashboards: "One dashboard"
      }
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getMHeroDashboards();
    expect(result).toEqual(["One dashboard"]);
  });

  test("mHero Dashboard as array returns array of dashboards", () => {
    jest.mock("@/config/config.json", () => ({
      mHero: {
        dashboards: ["One dashboard", "Two dashboards"]
      }
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.getMHeroDashboards();
    expect(result).toEqual(["One dashboard", "Two dashboards"]);
  });

  test("No demo config means demo is not enabled", () => {
    jest.mock("@/config/config.json", () => ({}));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.isDemoMode();
    expect(result).toBeFalsy();
  });

  test("Demo config not true means demo is not enabled", () => {
    jest.mock("@/config/config.json", () => ({
      demo: "yes"
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.isDemoMode();
    expect(result).toBeFalsy();
  });

  test("Demo config set to true means demo is enabled", () => {
    jest.mock("@/config/config.json", () => ({
      demo: true
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.isDemoMode();
    expect(result).toBeTruthy();
  });

  test("No mHero config means mHero is not enabled", () => {
    jest.mock("@/config/config.json", () => ({}));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.isMHeroEnabled();
    expect(result).toBeFalsy();
  });

  test("mHero config set but not installed means mHero is not enabled", () => {
    jest.mock("@/config/config.json", () => ({
      mHero: {}
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.isMHeroEnabled();
    expect(result).toBeFalsy();
  });

  test("mHero config set but installed not true means mHero is not enabled", () => {
    jest.mock("@/config/config.json", () => ({
      mHero: {
        installed: "yes"
      }
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.isMHeroEnabled();
    expect(result).toBeFalsy();
  });

  test("mHero config set and installed is true means mHero is enabled", () => {
    jest.mock("@/config/config.json", () => ({
      mHero: {
        installed: true
      }
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let result = wrapper.vm.isMHeroEnabled();
    expect(result).toBeTruthy();
  });

  test("No sample practitioner set gives false when called", () => {
    jest.mock("@/config/config.json", () => ({}));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let samplePractitioner = wrapper.vm.getSamplePractitioner();
    expect(samplePractitioner).toBeFalsy();
  });

  test("Sample practitioner set is returned when called", () => {
    jest.mock("@/config/config.json", () => ({
      samplePractitioner: 1234
    }));

    let wrapper = shallowMount(Component, {
      mixins: [ConfigSettings]
    });

    let samplePractitioner = wrapper.vm.getSamplePractitioner();
    expect(samplePractitioner).toBe(1234);
  });
});
