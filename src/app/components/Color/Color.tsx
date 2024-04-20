import { features } from "process";
import classes from "./Color.module.css";
import cn from "classnames";
import { SunIcon } from "@navikt/aksel-icons";

type ColorProps = {
  color: string;
  contrast?: string;
  lightness?: string;
  featured?: boolean;
  whiteText?: boolean;
  hex?: string;
};

const Color = ({
  color,
  contrast,
  featured,
  whiteText,
  lightness,
  hex,
}: ColorProps) => {
  return (
    <div>
      <div
        style={{ backgroundColor: color }}
        className={cn(
          classes.box,
          { [classes.featured]: featured },
          { [classes.whiteText]: whiteText }
        )}
      ></div>
      <div className={classes.hex}>{hex}</div>
      <div className={classes.contrast}>
        <div className={classes.colorTest}></div>
        {contrast}
      </div>
      <div className={classes.lightness}>
        <SunIcon title="a11y-title" fontSize="1.3rem" />
        {lightness}
      </div>
    </div>
  );
};

export { Color };
