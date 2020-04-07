import { shallowMount } from "@vue/test-utils";
import MobileLayout from "@/mixins/MobileLayout";

const Component = {
  template: '<div class="mi-component"></div>'
};

const wrapper = shallowMount(Component, {
  mixins: [MobileLayout]
});

describe("MobileLayout", () => {
  test("Invalid grid layout results in empty string", () => {
    let result = wrapper.vm.gridLayoutAddRecord("");
    expect(result).toBe("");
  });

  test("Valid grid layout does not result in empty string", () => {
    let result = wrapper.vm.gridLayoutAddRecord("xs");
    expect(result).not.toBe("");
  });

  test("Invalid title style results in empty string", () => {
    let result = wrapper.vm.titleStyle("");
    expect(result).toBe("");
  });

  test("Valid title style does not result in empty string", () => {
    let result = wrapper.vm.titleStyle("xs");
    expect(result).not.toBe("");
  });

  test("Invalid grid layout title results in empty string", () => {
    let result = wrapper.vm.gridLayoutTitle("");
    expect(result).toBe("");
  });

  test("Valid grid layout title does not result in empty string", () => {
    let result = wrapper.vm.gridLayoutTitle("xs");
    expect(result).not.toBe("");
  });

  test("Invalid title style search people results in empty string", () => {
    let result = wrapper.vm.titleStyleSearchPeople("");
    expect(result).toBe("");
  });

  test("Valid title style search people does not result in empty string", () => {
    let result = wrapper.vm.titleStyleSearchPeople("xs");
    expect(result).not.toBe("");
  });

  test("Invalid card title style results in empty string", () => {
    let result = wrapper.vm.cardTitleStyle("");
    expect(result).toBe("");
  });

  test("Valid card title style does not result in empty string", () => {
    let result = wrapper.vm.cardTitleStyle("xs");
    expect(result).not.toBe("");
  });

  test("Invalid font size paragraph results in empty string", () => {
    let result = wrapper.vm.fontSizeParagraph("");
    expect(result).toBe("");
  });

  test("Valid font size paragraph does not result in empty string", () => {
    let result = wrapper.vm.fontSizeParagraph("xs");
    expect(result).not.toBe("");
  });

  test("Invalid grid layout show record results in empty string", () => {
    let result = wrapper.vm.gridLayoutShowRecord("");
    expect(result).toBe("");
  });

  test("Valid grid layout show record does not result in empty string", () => {
    let result = wrapper.vm.gridLayoutShowRecord("xs");
    expect(result).not.toBe("");
  });

  test("Invalid grid layout search result results in empty string", () => {
    let result = wrapper.vm.gridLayoutSearchResult("");
    expect(result).toBe("");
  });

  test("Valid grid layout search result does not result in empty string", () => {
    let result = wrapper.vm.gridLayoutSearchResult("xs");
    expect(result).not.toBe("");
  });

  test("Invalid grid layout show result results in empty string", () => {
    let result = wrapper.vm.gridLayoutShowResult("");
    expect(result).toBe("");
  });

  test("Valid grid layout show result does not result in empty string", () => {
    let result = wrapper.vm.gridLayoutShowResult("xs");
    expect(result).not.toBe("");
  });

  test("Invalid grid profile header edit record results in empty string", () => {
    let result = wrapper.vm.gridProfileHeaderEditRecord("");
    expect(result).toBe("");
  });

  test("Valid grid profile header edit record does not result in empty string", () => {
    let result = wrapper.vm.gridProfileHeaderEditRecord("xs");
    expect(result).not.toBe("");
  });

  test("Invalid small screen compute is false", () => {
    let result = wrapper.vm.smallScreenCompute("");
    expect(result).toBeFalsy();
  });

  test("Valid small screen compute returns true", () => {
    let result = wrapper.vm.smallScreenCompute("xs");
    expect(result).toBeTruthy();
  });

  test("Invalid small screen search compute is false", () => {
    let result = wrapper.vm.smallScreenSearchCompute("");
    expect(result).toBeFalsy();
  });

  test("Valid small screen search compute is true", () => {
    let result = wrapper.vm.smallScreenSearchCompute("xs");
    expect(result).toBeTruthy()
  });

  test("Invalid detail card title style results in empty string", () => {
    let result = wrapper.vm.detailCardTitleStyle("");
    expect(result).toBe("");
  });

  test("Valid detail card title style does not result in empty string", () => {
    let result = wrapper.vm.detailCardTitleStyle("xs");
    expect(result).not.toBe("");
  });

  test("Invalid detail card button size results in empty string", () => {
    let result = wrapper.vm.detailCardBtnSize("");
    expect(result).toBe("");
  });

  test("Valid detail card button size does not result in empty string", () => {
    let result = wrapper.vm.detailCardBtnSize("xs");
    expect(result).not.toBe("");
  });

  test("Invalid min profile picture width results in empty string", () => {
    let result = wrapper.vm.minProfilePictureWidth("");
    expect(result).toBe("");
  });

  test("Valid min profile picture width does not result in empty string", () => {
    let result = wrapper.vm.minProfilePictureWidth("xs");
    expect(result).not.toBe("");
  });

  test("Invalid profile header grid layout results in empty string", () => {
    let result = wrapper.vm.profileHeaderGridLayout("");
    expect(result).toBe("");
  });

  test("Valid profile header grid layout does not result in empty string", () => {
    let result = wrapper.vm.profileHeaderGridLayout("xs");
    expect(result).not.toBe("");
  });
});
