import classes from "./Group.module.css";
import { Color } from "../Color/Color";

type ColorType = {
  color: string;
  text: string;
  lightness?: string;
  whiteText?: boolean;
};

type GroupProps = {
  header: string;
  colors: ColorType[];
};

export const Group = ({ header, colors }: GroupProps) => {
  return (
    <div className={classes.group}>
      <div className={classes.header}>{header}</div>
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
