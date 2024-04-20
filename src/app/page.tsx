"use client";

import classes from "./page.module.css";
import { Group } from "./components/Group/Group";
import {
  Theme,
  Color,
  BackgroundColor,
  CssColor,
} from "@adobe/leonardo-contrast-colors";
import { useEffect, useState } from "react";
import {
  luminanceFromRgb,
  hexToRgb,
  luminanceFromHex,
  getRatioFromLum,
} from "../utils/ColorUtils";
import { lightnessToContrast } from "@/utils/lightnessMapping";
import { Preview } from "./components/Preview/Preview";
import { CheckmarkIcon, XMarkIcon } from "@navikt/aksel-icons";
import cn from "classnames";

type ColorType = {
  color: string;
  text: string;
  whiteText?: boolean;
  constrast?: string;
};
import { ChromePicker } from "react-color";

const getCloses = (target: number) => {
  let minDiff = Infinity;
  let closestIndex = null;

  for (let i = 0; i < lightnessToContrast.length; i++) {
    const diff = Math.abs(lightnessToContrast[i] - target);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }
  return closestIndex;
};

export default function Home() {
  const [colors, setColors] = useState({
    backgrounds: [],
    components: [],
    borders: [],
    text: [],
    solids: [],
  });
  const [color, setColor] = useState<CssColor>("#F45F63");
  useEffect(() => {
    let gray = new BackgroundColor({
      name: "gray",
      colorKeys: ["white"],
      ratios: [2, 3, 4.5, 8],
    });
    let blue = new Color({
      name: "blue",
      colorKeys: [color],
      ratios: [
        lightnessToContrast[98],
        lightnessToContrast[95],
        lightnessToContrast[90],
        lightnessToContrast[85],
        lightnessToContrast[80],
        lightnessToContrast[70],
        lightnessToContrast[60],
        lightnessToContrast[50],
        lightnessToContrast[40],
        lightnessToContrast[20],
      ],
    });
    let theme = new Theme({
      colors: [blue],
      backgroundColor: gray,
      lightness: 100,
    });

    // returns theme colors as JSON
    let colors = theme.contrastColors;

    let values = colors[1].values;
    let test = {
      backgrounds: [],
      components: [],
      borders: [],
      text: [],
      solids: [],
    };

    for (let i = 0; i < values.length; i++) {
      let hex = values[i].value;
      let rgbColor = hexToRgb(hex);
      let lum = luminanceFromRgb(rgbColor?.r, rgbColor?.g, rgbColor?.b);
      let whiteText = lum < 0.45;

      if (i === 0 || i === 1) {
        test.backgrounds.push({
          color: values[i].value,
          text: values[i].contrast,
          whiteText: whiteText,
          lightness: getCloses(values[i].contrast),
        });
      }
      if (i === 2 || i === 3 || i === 4) {
        test.components.push({
          color: values[i].value,
          text: values[i].contrast,
          whiteText: whiteText,
          lightness: getCloses(values[i].contrast),
        });
      }
      if (i === 5 || i === 6 || i === 7) {
        test.borders.push({
          color: values[i].value,
          text: values[i].contrast,
          whiteText: whiteText,
          lightness: getCloses(values[i].contrast),
        });
      }
      if (i === 8 || i === 9) {
        test.text.push({
          color: values[i].value,
          text: values[i].contrast,
          whiteText: whiteText,
          lightness: getCloses(values[i].contrast),
        });
      }
    }

    let lum1 = luminanceFromHex(color);
    let lum2 = luminanceFromHex("#ffffff");
    let ratio = getRatioFromLum(lum1, lum2);
    let closestIndex = getCloses(ratio);

    let a = closestIndex <= 30 ? -11 : 11;

    let testBlue = new Color({
      name: "blue",
      colorKeys: [color],
      ratios: [
        lightnessToContrast[closestIndex - a],
        lightnessToContrast[closestIndex - a * 2],
      ],
    });
    let theme2 = new Theme({
      colors: [testBlue],
      backgroundColor: gray,
      lightness: 100,
    });

    let colors2 = theme2.contrastColors;
    let values2 = colors2[1].values;

    test.solids.push({
      color: color,
      text: ratio.toFixed(2),
      lightness: closestIndex,
    });
    test.solids.push({
      color: values2[0].value,
      text: values2[0].contrast,
      lightness: getCloses(values2[0].contrast),
    });
    test.solids.push({
      color: values2[1].value,
      text: values2[1].contrast,
      lightness: getCloses(values2[1].contrast),
    });

    document.documentElement.style.setProperty(
      "--fds-semantic-surface-action-first-default",
      color
    );
    document.documentElement.style.setProperty(
      "--fds-semantic-surface-action-first-hover",
      test.solids[1].color
    );

    document.documentElement.style.setProperty(
      "--fds-semantic-surface-success-default",
      color
    );

    console.log(test.solids[1].color);

    setColors(test);
  }, [color]);

  return (
    <main className={classes.main}>
      <div className={classes.top}>
        <ChromePicker
          onChange={(e) => {
            setColor(e.hex);
          }}
          color={color}
          width={250}
        />
        <div className={classes.selectedColor}>
          <div>{color}</div>
          <div>Contrast: {colors.solids[0]?.text}</div>
          <div
            className={cn(classes.icon, {
              [classes.red]: colors.solids[0]?.text < 4.5,
            })}
          >
            {colors.solids[0]?.text > 4.5 && (
              <CheckmarkIcon title="a11y-title" fontSize="1.3rem" />
            )}
            {colors.solids[0]?.text < 4.5 && (
              <XMarkIcon title="a11y-title" fontSize="1.3rem" />
            )}
          </div>
        </div>
      </div>

      <div className={classes.test}>
        <Group header="Backgrounds" colors={colors.backgrounds} />
        <Group header="Component UI" colors={colors.components} />
        <Group header="Borders" colors={colors.borders} />
        <Group header="Solids" colors={colors.solids} />
        <Group header="Text" colors={colors.text} />
      </div>
      <Preview colors={colors} />
    </main>
  );
}
