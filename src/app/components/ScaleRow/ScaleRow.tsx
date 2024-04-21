import classes from "./ScaleRow.module.css";
import cn from "classnames";
import { Scale } from "../Scale/Scale";
import { CssColor } from "@adobe/leonardo-contrast-colors";
import { useEffect, useRef, useState } from "react";
import { getRatioFromLum, luminanceFromHex } from "@/utils/ColorUtils";
import { CheckmarkIcon, XMarkIcon } from "@navikt/aksel-icons";
import { ChromePicker } from "react-color";
import { Modal, Button } from "@digdir/designsystemet-react";

type ScaleRowProps = {
  color: CssColor;
  showHeader?: boolean;
  name: string;
};

export const ScaleRow = ({ color, showHeader, name }: ScaleRowProps) => {
  const [contrast, setContrast] = useState<number>(0);
  const [activeColor, setActiveColor] = useState<CssColor>("#000000");
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    let lum1 = luminanceFromHex(color);
    let lum2 = luminanceFromHex("#ffffff");
    let ratio = getRatioFromLum(lum1, lum2);
    setContrast(ratio);
    setActiveColor(color);
  }, [color]);

  return (
    <div className={classes.row}>
      <div className={classes.selectedColor}>
        <div className={classes.name}>{name}</div>
        <div className={classes.tt}>
          <div
            className={classes.previewColor}
            style={{ backgroundColor: activeColor }}
          ></div>
          <div className={classes.picker}>
            <Modal.Root>
              <Modal.Trigger asChild>
                <Button size="small" variant="tertiary" color="second">
                  Velg farge
                </Button>
              </Modal.Trigger>
              <Modal.Dialog
                ref={modalRef}
                onInteractOutside={() => modalRef.current?.close()}
              >
                <Modal.Header>Velg farge</Modal.Header>
                <Modal.Content>
                  <ChromePicker
                    onChange={(e) => {
                      let lum1 = luminanceFromHex(e.hex);
                      let lum2 = luminanceFromHex("#ffffff");
                      let ratio = getRatioFromLum(lum1, lum2);
                      setContrast(ratio);
                      setActiveColor(e.hex);
                    }}
                    color={activeColor}
                    width={250}
                  />
                </Modal.Content>
              </Modal.Dialog>
            </Modal.Root>

            <div></div>
          </div>
        </div>
        <div>{color}</div>
        <div className={classes.contrast}>
          Contrast: {contrast.toFixed(2)}
          <div
            className={cn(classes.icon, {
              [classes.red]: contrast < 4.5,
            })}
          >
            {contrast > 4.5 && (
              <CheckmarkIcon title="a11y-title" fontSize="1.3rem" />
            )}
            {contrast < 4.5 && (
              <XMarkIcon title="a11y-title" fontSize="1.3rem" />
            )}
          </div>
        </div>
      </div>
      <Scale color={activeColor} showHeader={showHeader} />
      <div></div>
    </div>
  );
};
