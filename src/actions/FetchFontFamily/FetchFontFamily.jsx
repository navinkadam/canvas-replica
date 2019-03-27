export let loading = "loading";
export let getFont = "getFont";
export function getFontsList() {
  let fonts = [
    "arial",
    "monaco",
    "hoefler text",
    "optima",
    "plaster",
    "engagement",
    "VT323",
    "Helvetica Neue",
    "myriad pro",
    "comic sans ms",
    "delicious",
    "verdana",
    "georgia",
    "courier",
    "impact"
  ];
  return dispatch => {
    dispatch({ type: loading, payload: [] });
    setTimeout(() => {
      dispatch({ type: getFont, payload: fonts });
    }, 10);
  };
}
