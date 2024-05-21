const loadTheme = (args) => {
  let selectedTheme = "Material3";
  if (args) {
    args.chart.theme =
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
  }
};
export { loadTheme };
