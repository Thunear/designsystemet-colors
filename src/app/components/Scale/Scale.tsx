import classes from "./Scale.module.css";
import { Group } from "../Group/Group";
import { useEffect, useState } from "react";
import {
  Theme,
  Color,
  BackgroundColor,
  CssColor,
} from "@adobe/leonardo-contrast-colors";
import {
  getLightnessFromHex,
  getContrastFromLightness,
  luminanceFromHex,
  lightenDarkThemeColor,
} from "@/utils/ColorUtils";

type ScaleProps = {
  color: CssColor;
  showHeader?: boolean;
  showColorMeta?: boolean;
  themeMode: modeType;
};

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

type modeType = "light" | "dark" | "contrast";

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

const setToken = (token: string, color: string) => {
  const previewElement = document.getElementById("preview");
  if (previewElement) {
    previewElement.style.setProperty(token, color);
  }
};

const buildColorScale = (color: CssColor, mode: modeType) => {
  let leoBackgroundColor = new BackgroundColor({
    name: "gray",
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
    lightnessScale = [15, 10, 10, 15, 20, 30, 40, 40, 65, 80];
  } else {
    lightnessScale = [7, 1, 10, 15, 20, 30, 40, 40, 70, 90];
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

export const Scale = ({
  color,
  showHeader,
  showColorMeta,
  themeMode,
}: ScaleProps) => {
  const [colors, setColors] = useState<ColorsType>({
    backgrounds: [],
    components: [],
    borders: [],
    text: [],
    solids: [],
  });

  const [greyColors, setDarkColors] = useState<ColorsType>({
    backgrounds: [],
    components: [],
    borders: [],
    text: [],
    solids: [],
  });

  useEffect(() => {
    const lightColors = buildColorScale(color, themeMode);
    setColors(lightColors);

    const darkColors = buildColorScale("#1E2B3C", themeMode);
    setDarkColors(darkColors);

    if (color !== "#1E2B3C") {
      const previewElement = document.getElementById("preview");
      if (previewElement) {
        previewElement.style.setProperty(
          "--fds-semantic-surface-action-first-default",
          color
        );
      }

      setToken(
        "--fds-semantic-text-neutral-default",
        lightColors.text[1].color
      );
      setToken("--fds-semantic-text-neutral-subtle", lightColors.text[0].color);

      setToken(
        "--fds-semantic-background-default",
        lightColors.backgrounds[0].color
      );
      setToken(
        "--fds-semantic-background-subtle",
        lightColors.backgrounds[1].color
      );

      document.documentElement.style.setProperty(
        "--fds-semantic-surface-action-first-default",
        color
      );
      document.documentElement.style.setProperty(
        "--fds-semantic-surface-action-first-hover",
        lightColors.solids[1].color
      );
      document.documentElement.style.setProperty(
        "--fds-semantic-surface-action-first-active",
        lightColors.solids[2].color
      );

      document.documentElement.style.setProperty(
        "--fds-semantic-surface-success-default",
        color
      );
      document.documentElement.style.setProperty(
        "--fds-semantic-surface-success-hover",
        lightColors.solids[1].color
      );

      document.documentElement.style.setProperty(
        "--fds-semantic-surface-action-first-subtle",
        lightColors.components[0].color
      );
      document.documentElement.style.setProperty(
        "--fds-semantic-surface-action-first-subtle-hover",
        lightColors.components[1].color
      );
      document.documentElement.style.setProperty(
        "--fds-semantic-surface-action-first-subtle-active",
        lightColors.components[2].color
      );
      document.documentElement.style.setProperty(
        "--fds-semantic-border-action-first-subtle",
        lightColors.borders[0].color
      );
      document.documentElement.style.setProperty(
        "--fds-semantic-border-action-first-subtle-hover",
        lightColors.borders[1].color
      );

      document.documentElement.style.setProperty(
        "--fds-semantic-border-input-default",
        darkColors.borders[2].color
      );
      document.documentElement.style.setProperty(
        "--fds-semantic-border-input-hover",
        lightColors.solids[0].color
      );
      document.documentElement.style.setProperty(
        "--fds-checkbox-border-color",
        lightColors.solids[0].color
      );

      document.documentElement.style.setProperty(
        "--fds-semantic-surface-info-subtle-hover",
        lightColors.components[1].color
      );

      document.documentElement.style.setProperty(
        "--fds-semantic-border-action-first-default",
        lightColors.solids[1].color
      );

      setToken(
        "--fds-semantic-border-action-default",
        lightColors.solids[0].color
      );
      setToken("--fds-semantic-text-action-default", lightColors.text[1].color);
      setToken(
        "--fds-semantic-text-action-first-default",
        lightColors.text[1].color
      );
      setToken(
        "--fds-semantic-border-neutral-default",
        lightColors.solids[1].color
      );
      setToken("--fds-radio-border-color", lightColors.solids[0].color);
      setToken(
        "--fds-semantic-surface-action-first-no_fill",
        lightColors.components[0].color
      );
      setToken(
        "--fds-semantic-surface-action-first-no_fill-hover",
        lightColors.components[1].color
      );
    }
  }, [color, themeMode]);
  return (
    <div className={classes.themes}>
      <div className={classes.test}>
        <Group
          header={showHeader ? "Bakgrunner" : ""}
          colors={colors.backgrounds}
          showColorMeta={showColorMeta}
          names={["Subtle", "Default"]}
        />
        <Group
          header={showHeader ? "Komponent UI" : ""}
          colors={colors.components}
          showColorMeta={showColorMeta}
          names={["Normal", "Hover", "Active"]}
        />
        <Group
          showColorMeta={showColorMeta}
          header={showHeader ? "Kanter" : ""}
          colors={colors.borders}
          names={["Subtle", "Default", "Strong"]}
        />
        <Group
          showColorMeta={showColorMeta}
          header={showHeader ? "Solide farger" : ""}
          colors={colors.solids}
          names={["Normal", "Hover", "Active"]}
        />
        <Group
          showColorMeta={showColorMeta}
          header={showHeader ? "Tekst" : ""}
          colors={colors.text}
          names={["Subtle", "Default"]}
        />
      </div>
      {/* <div className={classes.test}>
        <Group showColorMeta={showColorMeta} colors={greyColors.backgrounds} />
        <Group showColorMeta={showColorMeta} colors={greyColors.components} />
        <Group showColorMeta={showColorMeta} colors={greyColors.borders} />
        <Group showColorMeta={showColorMeta} colors={greyColors.solids} />
        <Group showColorMeta={showColorMeta} colors={greyColors.text} />
      </div> */}
    </div>
  );
};
