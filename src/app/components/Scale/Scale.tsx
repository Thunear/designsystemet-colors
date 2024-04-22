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
  hexToRgb,
  luminanceFromRgb,
  getLightnessFromHex,
  getContrastFromLightness,
  luminanceFromHex,
  lightenDarkThemeColor,
} from "@/utils/ColorUtils";

type ScaleProps = {
  color: CssColor;
  showHeader?: boolean;
  showColorMeta?: boolean;
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

export const Scale = ({ color, showHeader, showColorMeta }: ScaleProps) => {
  const [colors, setColors] = useState<ColorsType>({
    backgrounds: [],
    components: [],
    borders: [],
    text: [],
    solids: [],
  });

  const [darkColors, setDarkColors] = useState<ColorsType>({
    backgrounds: [],
    components: [],
    borders: [],
    text: [],
    solids: [],
  });

  useEffect(() => {
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

    let leoColors = new Color({
      name: "leoMainColor",
      colorKeys: [color],
      ratios: [
        getContrastFromLightness(98, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(95, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(90, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(85, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(80, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(70, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(60, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(50, color, leoBackgroundColor.colorKeys[0]),
        solidContrast,
        solidHoverContrast,
        solidActiveContrast,
        getContrastFromLightness(40, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(20, color, leoBackgroundColor.colorKeys[0]),
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

    // Dark theme
    let darkMainColor = lightenDarkThemeColor(color);
    let darkColorLightness = getLightnessFromHex(darkMainColor);
    let darkMultiplier = darkColorLightness <= 30 ? -9 : 9;
    let darkSolidContrast = getContrastFromLightness(
      darkColorLightness,
      darkMainColor,
      leoBackgroundColor.colorKeys[0]
    );
    let darkSolidHoverContrast = getContrastFromLightness(
      darkColorLightness - darkMultiplier,
      darkMainColor,
      leoBackgroundColor.colorKeys[0]
    );
    let darkSolidActiveContrast = getContrastFromLightness(
      darkColorLightness - darkMultiplier * 2,
      darkMainColor,
      leoBackgroundColor.colorKeys[0]
    );

    let leoDarkColors = new Color({
      name: "leoMainColor",
      colorKeys: [color],
      ratios: [
        getContrastFromLightness(2, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(5, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(10, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(15, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(20, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(30, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(40, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(50, color, leoBackgroundColor.colorKeys[0]),
        darkSolidContrast,
        darkSolidHoverContrast,
        darkSolidActiveContrast,
        getContrastFromLightness(60, color, leoBackgroundColor.colorKeys[0]),
        getContrastFromLightness(80, color, leoBackgroundColor.colorKeys[0]),
      ],
    });

    let darkTheme = new Theme({
      colors: [leoDarkColors],
      backgroundColor: leoBackgroundColor,
      lightness: 100,
    });

    let darkThemeValues = darkTheme.contrastColors[1].values;

    let darkTempColors: ColorsType = {
      backgrounds: [],
      components: [],
      borders: [],
      text: [],
      solids: [],
    };

    addColorsToTempArray(darkThemeValues, darkTempColors);
    setColors(tempColors);
    setDarkColors(darkTempColors);

    document.documentElement.style.setProperty(
      "--fds-semantic-surface-action-first-default",
      color
    );
    document.documentElement.style.setProperty(
      "--fds-semantic-surface-action-first-hover",
      tempColors.solids[1].color
    );
    document.documentElement.style.setProperty(
      "--fds-semantic-surface-action-first-active",
      tempColors.solids[2].color
    );

    document.documentElement.style.setProperty(
      "--fds-semantic-surface-success-default",
      color
    );
    document.documentElement.style.setProperty(
      "--fds-semantic-surface-success-hover",
      tempColors.solids[1].color
    );

    document.documentElement.style.setProperty(
      "--fds-semantic-surface-action-first-subtle",
      tempColors.components[0].color
    );
    document.documentElement.style.setProperty(
      "--fds-semantic-surface-action-first-subtle-hover",
      tempColors.components[1].color
    );
    document.documentElement.style.setProperty(
      "--fds-semantic-surface-action-first-subtle-active",
      tempColors.components[2].color
    );
    document.documentElement.style.setProperty(
      "--fds-semantic-border-action-first-subtle",
      tempColors.borders[0].color
    );
    document.documentElement.style.setProperty(
      "--fds-semantic-border-action-first-subtle-hover",
      tempColors.borders[1].color
    );

    document.documentElement.style.setProperty(
      "--fds-semantic-border-input-default",
      "#808489"
    );
    document.documentElement.style.setProperty(
      "--fds-semantic-border-input-hover",
      tempColors.solids[0].color
    );
    document.documentElement.style.setProperty(
      "--fds-checkbox-border-color",
      tempColors.solids[0].color
    );

    document.documentElement.style.setProperty(
      "--fds-semantic-surface-info-subtle-hover",
      tempColors.components[1].color
    );

    document.documentElement.style.setProperty(
      "--fds-semantic-border-action-first-default",
      tempColors.borders[1].color
    );
  }, [color]);
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
      <div className={classes.test}>
        <Group showColorMeta={showColorMeta} colors={darkColors.backgrounds} />
        <Group showColorMeta={showColorMeta} colors={darkColors.components} />
        <Group showColorMeta={showColorMeta} colors={darkColors.borders} />
        <Group showColorMeta={showColorMeta} colors={darkColors.solids} />
        <Group showColorMeta={showColorMeta} colors={darkColors.text} />
      </div>
    </div>
  );
};
