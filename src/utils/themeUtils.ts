import {
  BackgroundColor,
  Color,
  ContrastColorValue,
  CssColor,
  Theme,
} from "@adobe/leonardo-contrast-colors";
import { getContrastFromLightness, getLightnessFromHex } from "./ColorUtils";
import { modeType, colorsType } from "@/types";

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
    lightnessScale = [98, 95, 92, 87, 82, 70, 60, 50, 35, 20];
  } else if (mode === "dark") {
    lightnessScale = [14, 10, 16, 19, 22, 35, 45, 55, 65, 80];
  } else {
    lightnessScale = [7, 1, 11, 14, 17, 45, 55, 65, 75, 90];
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
    },
    text: {
      subtle: setColorObject(themeValues[11]),
      default: setColorObject(themeValues[12]),
    },
  };

  return output;
};

const setColorObject = (themeValues: ContrastColorValue) => {
  return {
    color: themeValues.value,
    contrast: themeValues.contrast.toString(),
    lightness: getLightnessFromHex(themeValues.value).toString(),
  };
};
