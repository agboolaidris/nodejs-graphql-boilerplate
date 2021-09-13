const color = {
  //white 100-500 black 600-900
  neutral: {
    100: "#f4f4f4",
    400: "#e2eff1",
  },

  //blue
  primary: {
    900: "#555273",
    700: "#65799b",
  },

  //red
  secondary: {
    900: "#e23e57",
  },
};

const mediaQuery = {
  md: "only screen and (max-width:769px)",
  sm: "only screen and (max-width:500px)",
  xs: "only screen and (max-width:320px)",
};

export const theme = {
  color,
  mediaQuery,
};
