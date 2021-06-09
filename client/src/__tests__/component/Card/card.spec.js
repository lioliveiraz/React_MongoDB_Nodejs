import React from "react";
import { shallow } from "enzyme";
import ProfileCard from "./../../../components/Cards/ProfileCard";

describe("Profile Card", () => {
  let wrapper;
  const data = {
    profile: {
      loading: false,
      profile: {
        name: "John",
        bio: "lorem",
        role: "role",
        avatar: "avatar",
        skills: ["skill"],
        social: {
          youtube: "youtube",
          linkedin: "linkedin",
          github: "github",
        },
      },
    },
  };

  it("should match snapshot", async () => {
    wrapper = await shallow(<ProfileCard {...data} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
