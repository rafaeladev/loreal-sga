import { Colors } from "./Colors";

const tags = {
  bold: {
    fontFamily: "MonteserratBold",
  },
  boldBlue: {
    fontFamily: "MonteserratBold",
    color: Colors.Text.BleuNovotel,
  },
  titleRed: {
    fontFamily: "DMSans",
    fontSize: 24,
    color: Colors.Text.Red,
  },
  bullet: {
    wrap: {
      mode: "word",
      width: 700,
    },
    x: 20,
  },
  box: {
    color: Colors.Text.BleuNovotel,
    fontFamily: "MonteserratBold",
    backgroundColor: 0x000000,
    padding: {
      left: 16,
      right: 16,
      top: 10,
      bottom: 10,
    },
    cornerRadius: 12,
  },
};

export { tags };
