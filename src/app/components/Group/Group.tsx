import classes from "./Group.module.css";
import { Color } from "../Color/Color";
import { CssColor } from "@adobe/leonardo-contrast-colors";

type ColorType = {
  color: CssColor;
  text: string;
  whiteText: boolean;
  lightness: string;
};

type GroupProps = {
  header: string;
  colors: ColorType[];
};

export const Group = ({ header, colors }: GroupProps) => {
  return (
    <div className={classes.group}>
      {header && <div className={classes.header}>{header}</div>}
      <div className={classes.colors}>
        {colors.map(function (item, index) {
          return (
            <Color
              key={index}
              color={item.color}
              contrast={item.text}
              whiteText={item.whiteText}
              lightness={item.lightness}
              hex={item.color}
            />
          );
        })}
      </div>
    </div>
  );
};
