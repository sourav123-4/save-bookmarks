import { combineReducers } from "redux";
const initialState = { AllCategories: [], AllUsers: [] };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_CATEGORIES":
      return { ...state, AllCategories: action.data, success: true };
    default:
      return state;
  }
};

const indexReducer = combineReducers({
  rootReducer,
});

export default indexReducer;
