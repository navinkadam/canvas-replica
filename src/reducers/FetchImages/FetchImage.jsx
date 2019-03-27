import { loading, getImages } from "../../actions/FetchImages/FetchImage";
export default function getImagesSrc(state = [], action) {
  switch (action.type) {
    case loading:
      return { imgSrcList: action.payload, readyState: 1 };
    case getImages:
      return { imgSrcList: action.payload, readyState: 4 };
    default:
      return state;
  }
}
