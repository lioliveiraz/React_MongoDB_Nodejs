import React from "react";
import { mount, shallow, spyOn } from "enzyme";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import NewTechForm from "../../../components/Technology/NewTechForm";
import thunk from "redux-thunk";

const middleware = [thunk];

let initialState = {
  category: {
    categories: [
      { id: 1, name: "framework", color: "yellow" },
      { id: 2, name: "framework", color: "yellow" },
      { id: 3, name: "framework", color: "yellow" },
    ],
  },
  auth: {
    token: "token",
  },
  wall: {
    pool: [],
    warm: [],
    hot: [],
    cold: [],
    errors: [],
  },
};

describe("SignUp", () => {
  let wrapper;
  const mockStore = configureStore(middleware);
  const store = mockStore(initialState);
  const historyMock = { push: jest.fn() };

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Provider store={store}>
          <NewTechForm history={historyMock} />
        </Provider>
      </Router>
    );
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
