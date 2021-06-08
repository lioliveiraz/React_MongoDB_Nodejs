import React from "react";
import { mount, shallow, spyOn } from "enzyme";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./../../pages/Login";
import { validateTruthiness } from "./../utils/testUtils";

let initialState = {
  state: [],
};

describe("Login", () => {
  let wrapper;
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const historyMock = { push: jest.fn() };

  beforeEach(() => {
    wrapper = shallow(
      <Router history={historyMock}>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
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
});
