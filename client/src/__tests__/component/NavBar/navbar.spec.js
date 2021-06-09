import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "../../../components/Navbar/Navbar";
import { validateTruthiness } from "../../utils/testUtils";

describe("NavBar", () => {
  let wrapper, initialState, mockStore, store, historyMock;

  it("should match snapshot", () => {
    initialState = {
      auth: {
        isAuthenticated: true,
      },
    };
    mockStore = configureStore();
    store = mockStore(initialState);
    historyMock = { push: jest.fn() };
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Navbar historyMock={historyMock} />
        </Provider>
      </BrowserRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render correctly with user logged", async () => {
    initialState = {
      auth: {
        isAuthenticated: true,
      },
    };
    mockStore = configureStore();
    store = mockStore(initialState);
    historyMock = { push: jest.fn() };
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Navbar historyMock={historyMock} />
        </Provider>
      </BrowserRouter>
    );
    const profileMenu = wrapper.exists("[data-cy='profile-menu-toggle']");
    const logoutIcon = wrapper.exists("[data-cy='logout-icon']");
    const elementsArr = [profileMenu, logoutIcon];
    elementsArr.forEach((el) => {
      validateTruthiness(el);
    });

    wrapper.unmount();
  });

  it("the toggle buttons should work correctly", async () => {
    initialState = {
      auth: {
        isAuthenticated: true,
      },
    };
    mockStore = configureStore();
    store = mockStore(initialState);
    historyMock = { push: jest.fn() };
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Navbar historyMock={historyMock} />
        </Provider>
      </BrowserRouter>
    );
    const MenuButton = wrapper.find("[data-cy='navbar-menu-button']").at(0);
    await MenuButton.simulate("click");

    expect(wrapper.exists("ul")).toBeTruthy();

    await wrapper
      .find("[data-cy='profile-menu-toggle']")
      .at(0)
      .simulate("click");
    expect(wrapper.exists("ul")).toBeTruthy();
  });

  it("should render correctly with user not logged", () => {
    initialState = {
      auth: {
        isAuthenticated: false,
      },
    };
    mockStore = configureStore();
    store = mockStore(initialState);
    historyMock = { push: jest.fn() };
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Navbar historyMock={historyMock} />
        </Provider>
      </BrowserRouter>
    );
    const navBar = wrapper.exists('[data-cy="navbar"]');
    const MenuButton = wrapper.exists("[data-cy='navbar-menu-button']");
    const AppTittle = wrapper.exists("h4");
    const Menu = wrapper.exists('[data-cy="menu"]');
    const loginButton = wrapper.exists("[data-cy='login-button']");

    const elementsArr = [navBar, MenuButton, AppTittle, Menu, loginButton];
    elementsArr.forEach((el) => {
      validateTruthiness(el);
    });

    wrapper.unmount();
  });
});
