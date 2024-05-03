import { CssColor } from "@adobe/leonardo-contrast-colors";

export type modeType = "light" | "dark" | "contrast";

export type colorType = {
  color: CssColor;
  contrast: string;
  lightness: string;
};

export type colorsType = {
  background: { subtle: colorType; default: colorType };
  component: { normal: colorType; hover: colorType; active: colorType };
  border: { subtle: colorType; default: colorType; strong: colorType };
  solid: {
    normal: colorType;
    hover: colorType;
    active: colorType;
    contrastOne: colorType;
    contrastTwo: colorType;
  };
  text: { subtle: colorType; default: colorType };
};
