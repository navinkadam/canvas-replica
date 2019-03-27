import {
  loading,
  getFont
} from "../../actions/FetchFontFamily/FetchFontFamily";

export default function getFontsList(state = [], action) {
  switch (action.type) {
    case loading:
      return { fontList: action.payload, readyState: 1 };
    case getFont:
      return { fontList: action.payload, readyState: 4 };

    default:
      return state;
  }
}
