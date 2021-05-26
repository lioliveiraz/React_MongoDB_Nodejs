import { fetchTechs } from "./../../api/requests/get";
import { GET_SURVEY } from "./types";
import { categoryName } from "../../helpers/globalVar";

export const buildSurvey = () => async (dispatch) => {
  try {
    let res = await fetchTechs();
    res = res.techs;
    let categories = [];
    res.forEach((element) => {
      categories.push(element.category.toLowerCase());
    });
    const techs = res;

    const libraries = res.filter(
      (tech) => tech.category === categoryName.LIBRARY
    );
    const frameworks = res.filter(
      (tech) => tech.category === categoryName.FRAMEWORK
    );
    const databases = res.filter(
      (tech) => tech.category === categoryName.DATABASE
    );
    const testing = res.filter(
      (tech) => tech.category === categoryName.TESTING
    );
    const collaboration = res.filter(
      (tech) => tech.category === categoryName.COLLABORATION
    );
    const languages = res.filter(
      (tech) => tech.category === categoryName.LANGUAGE
    );

    dispatch({
      type: GET_SURVEY,
      payload: {
        techs,
        categories: [...new Set(categories)],
        libraries,
        testing,
        databases,
        frameworks,
        collaboration,
        languages,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
