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
  showColorMeta?: boolean;
  names?: string[];
};

export const Group = ({ header, colors, showColorMeta, names }: GroupProps) => {
  return (
    <div className={classes.group}>
      {header && <div className={classes.header}>{header}</div>}
      {header && names && (
        <div className={classes.names}>
          {names.map((name, index) => (
            <div key={index}>{name}</div>
          ))}
        </div>
      )}
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
              showColorMeta={showColorMeta}
            />
          );
        })}
      </div>
    </div>
  );
};
