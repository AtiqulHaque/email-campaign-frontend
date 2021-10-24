import { combineReducers } from "redux";
import { campaign } from "./campaign.reducer";

const rootReducer = combineReducers({
  campaign,
});

export default rootReducer;
