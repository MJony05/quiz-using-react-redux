import { CHANGE_AMOUNT, CHANGE_CATEGORY, CHANGE_SCORE } from "./config";

const initialState = {
  question_category: "",
  amount_of_questions: 10,
  score: 0,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        question_category: action.payload,
      };
    case CHANGE_AMOUNT:
      return {
        ...state,
        amount_of_questions: action.payload,
      };
    case CHANGE_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
