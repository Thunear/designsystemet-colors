import classes from "./PreviewBox.module.css";
import { Button, Switch } from "@digdir/designsystemet-react";

export const PreviewBox = () => {
  return (
    <div className={classes.box}>
      <div className={classes.search}>
        <input className={classes.input} type="text" />
        <Button className={classes.btn}>Click me</Button>
      </div>
      <Switch />
      <Switch checked />
    </div>
  );
};
