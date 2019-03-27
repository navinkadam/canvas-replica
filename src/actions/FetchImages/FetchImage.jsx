export let loading = "lading";
export let getImages = "getImages";
export function getImageSrc() {
  let imgSrc = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.png",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.png",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg"
  ];
  return dispatch => {
    dispatch({ type: loading, payload: [] });
    setTimeout(() => {
      dispatch({ type: getImages, payload: imgSrc });
    }, 1000);
  };
}
