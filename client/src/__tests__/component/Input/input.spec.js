import React from "react";
import { mount } from "enzyme";
import Input from "../../../components/Base/Input";

describe("Input", () => {
  let wrapper;
  const historyMock = { push: jest.fn() };

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render correctly", () => {
    wrapper = mount(
      <Input
        type="text"
        name="name"
        placeholder="John"
        required={true}
        getUserInput={jest.fn()}
        error="Not valid"
      />
    );
    expect(wrapper).toMatchSnapshot();
    const label = wrapper.find("label");
    const errorMessage = wrapper.find("p");

    expect(label.text()).toEqual("Name *");
    expect(errorMessage.text()).toEqual("Not valid");
  });

  it("should not render error message", () => {
    wrapper = mount(
      <Input
        type="text"
        name="name"
        placeholder="John"
        required={true}
        getUserInput={jest.fn()}
      />
    );
    const errorMessage = wrapper.get("p");
    expect(errorMessage).toBeUndefined();
  });

  it("Should send right data", () => {
    let inputValue = {};

    wrapper = mount(
      <Input
        type="text"
        name="name"
        placeholder="John"
        required={true}
        getUserInput={(value, name) => (inputValue[name] = value)}
      />
    );
    const input = wrapper.find("[data-cy='input-name']");
    input.simulate("input", { target: { name: "name", value: "Ligia" } });
    expect(inputValue).toMatchObject({ name: "Ligia" });
  });
});
