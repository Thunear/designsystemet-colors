import classes from "./Scale.module.css";
import { Group } from "../Group/Group";
import { useEffect, useState } from "react";
import { CssColor } from "@adobe/leonardo-contrast-colors";

import { buildColorScale } from "@/utils/themeUtils";

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

const setToken = (token: string, color: string) => {
  const previewElement = document.getElementById("preview");
  if (previewElement) {
    previewElement.style.setProperty(token, color);
  }
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

    // This check is a hack to make the preview work
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
        lightColors.borders[2].color
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
        lightColors.borders[2].color
      );
      setToken(
        "--fds-semantic-border-neutral-subtle",
        lightColors.borders[0].color
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
    </div>
  );
};
