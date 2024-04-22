import classes from "./PreviewBox.module.css";
import {
  Button,
  Switch,
  Chip,
  Textfield,
  Checkbox,
  Spinner,
} from "@digdir/designsystemet-react";

export const PreviewBox = () => {
  return (
    <div className={classes.box}>
      <div className={classes.search}>
        <Textfield label="" className={classes.input} />
        <Button className={classes.btn}>Click me</Button>
      </div>
      <Spinner size="medium" title="Henter kaffi" variant="interaction" />
      <Switch />
      <Switch checked />
      <Checkbox size="medium" value="value">
        Checkbox
      </Checkbox>
      <Checkbox size="medium" value="value" checked>
        Checkbox
      </Checkbox>

      <Chip.Toggle size="medium">Toggle</Chip.Toggle>
    </div>
  );
};
