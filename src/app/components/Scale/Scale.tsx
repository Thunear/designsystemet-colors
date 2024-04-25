import classes from "./Scale.module.css";
import { Group } from "../Group/Group";
import { useEffect, useState } from "react";
import { CssColor } from "@adobe/leonardo-contrast-colors";
import { tokenMapping as tokens } from "@/utils/tokenMapping";
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

const setTokens = (tokens: string[], color: string) => {
  for (const token of tokens) {
    setToken(token, color);
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

      // Background subtle
      setTokens(tokens.background.subtle, lightColors.backgrounds[0].color);

      // Background default
      setTokens(tokens.background.default, lightColors.backgrounds[1].color);

      // Component normal
      setTokens(tokens.component.normal, lightColors.components[0].color);

      // Component hover
      setTokens(tokens.component.normal, lightColors.components[1].color);

      // Component active
      setTokens(tokens.component.active, lightColors.components[2].color);

      // Border subtle
      setTokens(tokens.border.subtle, lightColors.borders[0].color);

      // Border default
      setTokens(tokens.border.default, lightColors.borders[1].color);

      // Border strong
      setTokens(tokens.border.strong, lightColors.borders[2].color);

      // Solid normal
      setTokens(tokens.solids.normal, lightColors.solids[0].color);

      // Solid hover
      setTokens(tokens.solids.hover, lightColors.solids[1].color);

      // Solid active
      setTokens(tokens.solids.active, lightColors.solids[2].color);

      // Text subtle
      setTokens(tokens.text.subtle, lightColors.text[0].color);

      // Text default
      setTokens(tokens.text.default, lightColors.text[1].color);
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
