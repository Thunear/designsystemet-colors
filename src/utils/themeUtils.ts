import {
  BackgroundColor,
  Color,
  CssColor,
  Theme,
} from "@adobe/leonardo-contrast-colors";
import {
  getContrastFromLightness,
  getLightnessFromHex,
  luminanceFromHex,
} from "./ColorUtils";
import { modeType } from "@/types";

type ColorType = {
  color: CssColor;
  text: string;
  whiteText?: boolean;
  lightness: string;
};

type ColorsType = {
  backgrounds: ColorType[];
  components: ColorType[];
  borders: ColorType[];
  text: ColorType[];
  solids: ColorType[];
};

/**
 *
 * @param color The base color that is going to be used to generate the color scale
 * @param mode The mode of the theme
 * @returns ColorsType[]
 */
export const buildColorScale = (color: CssColor, mode: modeType) => {
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
    lightnessScale = [98, 95, 90, 85, 80, 70, 60, 50, 35, 20];
  } else if (mode === "dark") {
    lightnessScale = [14, 10, 10, 15, 20, 35, 45, 55, 65, 80];
  } else {
    lightnessScale = [7, 1, 5, 10, 15, 45, 55, 65, 75, 90];
  }

  let leoColors = new Color({
    name: "leoMainColor",
    colorKeys: [color],
    ratios: [
      getContrastFromLightness(
        lightnessScale[0],
        color,
        leoBackgroundColor.colorKeys[0]
      ),
      getContrastFromLightness(
        lightnessScale[1],
        color,
        leoBackgroundColor.colorKeys[0]
      ),
      getContrastFromLightness(
        lightnessScale[2],
        color,
        leoBackgroundColor.colorKeys[0]
      ),
      getContrastFromLightness(
        lightnessScale[3],
        color,
        leoBackgroundColor.colorKeys[0]
      ),
      getContrastFromLightness(
        lightnessScale[4],
        color,
        leoBackgroundColor.colorKeys[0]
      ),
      getContrastFromLightness(
        lightnessScale[5],
        color,
        leoBackgroundColor.colorKeys[0]
      ),
      getContrastFromLightness(
        lightnessScale[6],
        color,
        leoBackgroundColor.colorKeys[0]
      ),
      getContrastFromLightness(
        lightnessScale[7],
        color,
        leoBackgroundColor.colorKeys[0]
      ),
      solidContrast,
      solidHoverContrast,
      solidActiveContrast,
      getContrastFromLightness(
        lightnessScale[8],
        color,
        leoBackgroundColor.colorKeys[0]
      ),
      getContrastFromLightness(
        lightnessScale[9],
        color,
        leoBackgroundColor.colorKeys[0]
      ),
    ],
  });

  let theme = new Theme({
    colors: [leoColors],
    backgroundColor: leoBackgroundColor,
    lightness: 100,
  });

  let themeValues = theme.contrastColors[1].values;

  let tempColors: ColorsType = {
    backgrounds: [],
    components: [],
    borders: [],
    text: [],
    solids: [],
  };

  addColorsToTempArray(themeValues, tempColors);
  return tempColors;
};

const addColorsToTempArray = (themeValues: any, tempArray: ColorsType) => {
  for (let i = 0; i < themeValues.length; i++) {
    let hexValue = themeValues[i].value;
    let contrast = themeValues[i].contrast;
    let lum = luminanceFromHex(hexValue);
    let whiteText = lum < 0.45;

    let colorType: ColorType = {
      color: hexValue,
      text: contrast.toString(),
      whiteText: whiteText,
      lightness: getLightnessFromHex(hexValue).toString(),
    };

    if (i === 0 || i === 1) {
      tempArray.backgrounds.push(colorType);
    }
    if (i === 2 || i === 3 || i === 4) {
      tempArray.components.push(colorType);
    }
    if (i === 5 || i === 6 || i === 7) {
      tempArray.borders.push(colorType);
    }
    if (i === 8 || i === 9 || i === 10) {
      tempArray.solids.push(colorType);
    }
    if (i === 11 || i === 12) {
      tempArray.text.push(colorType);
    }
  }
};
