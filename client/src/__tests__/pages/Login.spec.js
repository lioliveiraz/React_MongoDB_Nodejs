import React from "react";
import { mount, shallow, spyOn } from "enzyme";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./../../pages/Login";
import { validateTruthiness } from "./../utils/testUtils";

let initialState = {
  auth: {
    errors: null,
  },
};

describe("Login", () => {
  let wrapper;
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const historyMock = { push: jest.fn() };

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Provider store={store}>
          <Login history={historyMock} />
        </Provider>
      </Router>
    );
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render correctly", () => {
    const loginForm = wrapper.find("[data-cy='login-form']");
    const InputPassword = wrapper.find("[type='password']");
    const InputEmail = wrapper.find("[type='email']");
    const button = wrapper.find('[data-cy="button-submit"]');
    const img = wrapper.find("img");
    const pTag = wrapper.find("p");

    const elementsArr = [
      loginForm,
      InputEmail,
      button,
      InputPassword,
      img,
      pTag,
    ];
    elementsArr.forEach((el) => {
      validateTruthiness(el);
    });
  });

  it("Should  password error message display", async () => {
    const inputEmail = wrapper.find("input").at(0);
    const button = wrapper.find("button").at(0);

    await inputEmail.simulate("input", {
      target: { value: "email@email.com", name: "email" },
    });

    await button.simulate("click");

    expect(wrapper.text()).toContain('"password" is required');
  });

  it("Should error message display", async () => {
    const inputPassword = wrapper.find("input").at(1);
    const button = wrapper.find("button").at(0);

    await inputPassword.simulate("input", {
      target: { value: "12345678", name: "password" },
    });

    await button.simulate("click");

    expect(wrapper.text()).toContain('"email" is required');
  });
});
