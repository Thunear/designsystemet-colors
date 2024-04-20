import { Button, Switch } from "@digdir/designsystemet-react";
import classes from "./Preview.module.css";

type PreviewProps = {
  colors: any;
};

export const Preview = ({ colors }: PreviewProps) => {
  return (
    <div className={classes.preview}>
      <Button size="small">Click me</Button>
      <Switch checked>Mørk modus</Switch>
    </div>
  );
};
