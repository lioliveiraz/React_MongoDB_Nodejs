import React from "react";
import { shallow } from "enzyme";
import TechModal from "./../../../components/Cards/TechModal";
import { validateTruthiness } from "./../../utils/testUtils";

describe("Tech Modal", () => {
  let wrapper;
  const data = {
    name: "name",
    creator: "creator",
    description: "description",
  };

  beforeEach(() => {
    wrapper = shallow(<TechModal {...data} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render correctly", () => {
    const title = wrapper.exists('[data-cy="modal-title"]');
    const description = wrapper.exists('[data-cy="modal-description"]');
    const creator = wrapper.exists('[data-cy="modal-creator"]');

    const elementArr = [title, description, creator];

    elementArr.forEach((el) => {
      validateTruthiness(el);
    });
  });

  it("should render according to props", () => {
    const title = wrapper.find('[data-cy="modal-title"]').text();
    const description = wrapper.find('[data-cy="modal-description"]').text();
    const creator = wrapper.find('[data-cy="modal-creator"]').text();

    expect(title).toEqual(data.name);
    expect(description).toEqual(data.description);
    expect(creator).toEqual(data.creator);
  });
});
