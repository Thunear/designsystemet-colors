import {
  BackgroundColor,
  Color,
  ContrastColorValue,
  CssColor,
  Theme,
} from "@adobe/leonardo-contrast-colors";
import {
  getContrastFromHex,
  getContrastFromLightness,
  getLightnessFromHex,
  getRatioFromLum,
} from "./ColorUtils";
import { modeType, colorsType } from "@/types";
import { get } from "http";

type outputType = "flat" | "object";

/**
 *
 * @param color The base color that is going to be used to generate the color scale
 * @param mode The mode of the theme
 */
export const generateColorScale = (
  color: CssColor,
  mode: modeType,
  outputType: outputType = "object"
) => {
  let leoBackgroundColor = new BackgroundColor({
    name: "backgroundColor",
    colorKeys: ["#ffffff"],
    ratios: [1],
  });

  let colorLightness = getLightnessFromHex(color);
  let multiplier = colorLightness <= 30 ? -9 : 9;
  let solidContrast = getContrastFromLightness(
    colorLightness,
    color,
    leoBackgroundColor.colorKeys[0]
  );
  let solidHoverContrast = getContrastFromLightness(
    colorLightness - multiplier,
    color,
    leoBackgroundColor.colorKeys[0]
  );
  let solidActiveContrast = getContrastFromLightness(
    colorLightness - multiplier * 2,
    color,
    leoBackgroundColor.colorKeys[0]
  );

  let lightnessScale: number[] = [];

  if (mode === "light") {
    lightnessScale = [100, 96, 93, 86, 79, 81, 58, 35, 34, 20];
  } else if (mode === "dark") {
    lightnessScale = [14, 10, 20, 24, 28, 35, 45, 55, 70, 82];
  } else {
    lightnessScale = [7, 2, 12, 15, 18, 45, 55, 65, 80, 92];
  }

  const getColorContrasts = (
    color: CssColor,
    lightnessScale: number[],
    backgroundColor: CssColor
  ) => {
    return lightnessScale.map((lightness) =>
      getContrastFromLightness(lightness, color, backgroundColor)
    );
  };

  let colors = new Color({
    name: "color",
    colorKeys: [color],
    ratios: [
      ...getColorContrasts(
        color,
        lightnessScale.slice(0, 8),
        leoBackgroundColor.colorKeys[0]
      ),
      solidContrast,
      solidHoverContrast,
      solidActiveContrast,
      ...getColorContrasts(
        color,
        lightnessScale.slice(8),
        leoBackgroundColor.colorKeys[0]
      ),
    ],
  });

  let theme = new Theme({
    colors: [colors],
    backgroundColor: leoBackgroundColor,
    lightness: 100,
  });

  if (outputType === "flat") {
    let flatArr = theme.contrastColorValues;
    flatArr.push(setContrastOneColor(color).color as CssColor);
    return theme.contrastColorValues;
  }

  const themeValues = theme.contrastColors[1].values;

  const output: colorsType = {
    background: {
      subtle: setColorObject(themeValues[0]),
      default: setColorObject(themeValues[1]),
    },
    component: {
      normal: setColorObject(themeValues[2]),
      hover: setColorObject(themeValues[3]),
      active: setColorObject(themeValues[4]),
    },
    border: {
      subtle: setColorObject(themeValues[5]),
      default: setColorObject(themeValues[6]),
      strong: setColorObject(themeValues[7]),
    },
    solid: {
      normal: setColorObject(themeValues[8]),
      hover: setColorObject(themeValues[9]),
      active: setColorObject(themeValues[10]),
      contrastOne: setContrastOneColor(themeValues[10].value),
      contrastTwo: setContrastOneColor(color),
    },
    text: {
      subtle: setColorObject(themeValues[11]),
      default: setColorObject(themeValues[12]),
    },
  };

  return output;
};

const setContrastOneColor = (color: CssColor) => {
  const outputColor = {
    color: "#ffffff",
    contrast: "d",
    lightness: "5",
  };
  const contrastWhite = getContrastFromHex(color, "#ffffff");
  const contrastBlack = getContrastFromHex(color, "#000000");
  const colorLightness = getLightnessFromHex(color);
  const doubleALightnessModifier = 47;
  let targetLightness = 0;
  const contrastDirection =
    contrastWhite > contrastBlack ? "lighten" : "darken";

  targetLightness =
    contrastDirection === "lighten"
      ? colorLightness + doubleALightnessModifier
      : colorLightness - doubleALightnessModifier;
  const t = createTheme(color, targetLightness);
  outputColor.color = t;

  return outputColor;
};

const createTheme = (color: CssColor, lightness: number) => {
  let leoBackgroundColor = new BackgroundColor({
    name: "backgroundColor",
    colorKeys: ["#ffffff"],
    ratios: [1],
  });
  let colors = new Color({
    name: "color",
    colorKeys: [color],
    ratios: [getContrastFromLightness(lightness, color, "#ffffff")],
  });

  let theme = new Theme({
    colors: [colors],
    backgroundColor: leoBackgroundColor,
    lightness: 100,
  });
  return theme.contrastColorValues[0];
};

const setColorObject = (themeValues: ContrastColorValue) => {
  return {
    color: themeValues.value,
    contrast: themeValues.contrast.toString(),
    lightness: getLightnessFromHex(themeValues.value).toString(),
  };
};
