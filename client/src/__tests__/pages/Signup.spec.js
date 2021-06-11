import React from "react";
import { mount, shallow, spyOn } from "enzyme";

import Signup from "./../../pages/Signup";
import { validateTruthiness } from "./../utils/testUtils";

describe("SignUp", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Signup />);
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render correctly", () => {
    const signUpForm = wrapper.find("[data-cy='signUp-form']");
    const inputEmail = wrapper.find("[data-cy='input-email']");
    const inputPassword = wrapper.find("[data-cy='input-password']");
    const inputName = wrapper.find("[data-cy='input-name']");
    const button = wrapper.find("[data-cy='sign-up-submit-button']");
    const checkbox = wrapper.find("[data-cy='checkbox']");
    const title = wrapper.find("h1");

    const elementsArr = [
      signUpForm,
      inputEmail,
      inputPassword,
      inputName,
      checkbox,
      button,
      title,
    ];
    elementsArr.forEach((el) => {
      validateTruthiness(el);
    });
  });

  it("button should be disabled", () => {
    const button = wrapper.find("button").at(0);

    expect(button.prop("disabled")).toBeTruthy();
  });
  it("Should  password error message display", async () => {
    const inputEmail = wrapper.find("[data-cy='input-email']");
    const inputPassword = wrapper.find("[data-cy='input-password']");
    const inputName = wrapper.find("[data-cy='input-name']");
    const button = wrapper.find("button").at(0);

    await inputEmail.simulate("input", {
      target: { value: "email", name: "email" },
    });

    await inputPassword.simulate("input", {
      target: { value: "12345678", name: "name" },
    });

    await inputName.simulate("input", {
      target: { value: "joao", name: "name" },
    });
    await button.simulate("click");
    expect(wrapper.text()).toContain("must be a valid email");
  });
});
