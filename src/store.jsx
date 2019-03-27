import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import getImagesSrc from "./reducers/FetchImages/FetchImage";
import getFontsList from "./reducers/FetchFontFamily/FetchFontFamily";

let reducer = combineReducers({
  getImagesSrc: getImagesSrc,
  getFontList: getFontsList
});

let reducerState = { getImagesSrc: [], getFontList: [] };

let store = createStore(reducer, reducerState, compose(applyMiddleware(thunk)));

export default store;
