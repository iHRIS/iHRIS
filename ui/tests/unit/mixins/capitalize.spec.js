import { mount } from "@vue/test-utils";
import Capitalize from "@/mixins/Capitalize";

const Component = {
  template: '<div class="mi-component"></div>'
};

const wrapper = mount(Component, {
  mixins: [Capitalize]
});

describe("Capitalize", () => {
  test("Numbers remain unchanged", () => {
    let result = wrapper.vm.capitalize(123);

    expect(result).toBe(123);
  });

  test("Arrays remain arrays", () => {
    let array = [1, 2, 3];
    let result = wrapper.vm.capitalize(array);

    expect(result).toBe(array);
    expect(Array.isArray(result)).toBeTruthy();
  });

  test("Objects remain objecxts", () => {
    let object = {
      a: "a",
      b: "b"
    };
    let result = wrapper.vm.capitalize(object);

    expect(result).toBe(object);
    expect(typeof result === "object" && result !== null).toBeTruthy();
  });

  test("Capitalizes the first letter only", () => {
    let result = wrapper.vm.capitalize("my string");

    expect(result).toBe("My string");
  });
});
