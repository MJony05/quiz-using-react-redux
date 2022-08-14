import { CHANGE_CATEGORY, CHANGE_AMOUNT, CHANGE_SCORE} from "./config";
export const handleCategoryChange = payload => ({
  type: CHANGE_CATEGORY,
  payload
})
export const handleAmountChange = payload => ({
  type: CHANGE_AMOUNT,
  payload
})
export const handleScoreChange = payload => ({
  type: CHANGE_SCORE,
  payload
})