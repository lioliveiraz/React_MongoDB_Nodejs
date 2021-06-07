import React from "react";
import { mount, shallow, spyOn } from "enzyme";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "../../../components/Navbar/Navbar";
const initialState = {
  state: [],
  reducer: {},
};

describe("NavBar", () => {
  let wrapper;
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const historyMock = { push: jest.fn() };

  beforeEach(() => {
    wrapper = shallow(
      <BrowserRouter history={historyMock}>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </BrowserRouter>
    );
  });
  it("", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
