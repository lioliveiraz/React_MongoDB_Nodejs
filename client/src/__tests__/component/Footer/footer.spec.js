import Footer from "../../../components/Footer";
import { shallow } from "enzyme";

describe("Footer", () => {
  it("should match Snapshot", () => {
    let wrapper = shallow(<Footer />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.html).toMatchSnapshot();
  });
});
