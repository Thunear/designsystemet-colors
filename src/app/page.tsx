/* eslint-disable @next/next/no-img-element */
"use client";

import classes from "./page.module.css";

import { Header } from "./components/Header/Header";
import { Scale } from "./components/Scale/Scale";
import { ColorPicker } from "./components/ColorPicker/ColorPicker";
import { useState } from "react";
import { CssColor } from "@adobe/leonardo-contrast-colors";
import { PreviewBox } from "./components/PreviewBox/PreviewBox";
import { Container, Row, Col } from "react-bootstrap";
import { tokenMapping } from "@/utils/tokenMapping";
import { ChevronDownIcon } from "@navikt/aksel-icons";

import cn from "classnames";
import { Button, DropdownMenu } from "@digdir/designsystemet-react";

type modeType = "light" | "dark" | "contrast";

const loopTokens = (arr: []) => {
  return (
    <div>
      {arr.map((token, index) => (
        <div key={index}>{token}</div>
      ))}
    </div>
  );
};

export default function Home() {
  const [accentColor, setAccentColor] = useState<CssColor>("#0062BA");
  const [greyColor, setGreyColor] = useState<CssColor>("#1E2B3C");
  const [themeMode, setThemeMode] = useState<modeType>("light");
  return (
    <div>
      <Header />
      <main className={classes.main}>
        <Container>
          <div>
            <h1 className={classes.title}>Sett opp fargetema</h1>

            <div className={classes.toggles}>
              <button
                className={cn(classes.toggle, {
                  [classes.active]: themeMode === "light",
                })}
                onClick={() => setThemeMode("light")}
              >
                <img src="img/light-dot.svg" alt="" /> Lys
              </button>
              <button
                className={cn(classes.toggle, {
                  [classes.active]: themeMode === "dark",
                })}
                onClick={() => setThemeMode("dark")}
              >
                <img src="img/dark-dot.svg" alt="" /> Mørk
              </button>
              <button
                className={cn(classes.toggle, {
                  [classes.active]: themeMode === "contrast",
                })}
                onClick={() => setThemeMode("contrast")}
              >
                <img src="img/contrast-dot.svg" alt="" /> Kontrast
              </button>
            </div>

            <div className={classes.box}>
              <ColorPicker
                label="Accent farge"
                defaultColor="#0062BA"
                onColorChanged={(e: any) => {
                  setAccentColor(e);
                }}
              />
              <ColorPicker
                label="Gråfarge"
                defaultColor="#1E2B3C"
                onColorChanged={(e: any) => {
                  setGreyColor(e);
                }}
              />
              <ColorPicker
                disabled
                label="Bakgrunnsfarge"
                defaultColor="#ffffff"
              />
              <div className={classes.dropdown}>
                <DropdownMenu placement="bottom-start" size="small">
                  <DropdownMenu.Trigger asChild>
                    <Button size="small">
                      Kopier
                      <ChevronDownIcon title="a11y-title" fontSize="1.5rem" />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Group>
                      <DropdownMenu.Item>CSS variabler (WIP)</DropdownMenu.Item>
                      <DropdownMenu.Item>JSON (WIP)</DropdownMenu.Item>
                    </DropdownMenu.Group>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <Scale
            color={accentColor}
            showHeader
            showColorMeta={false}
            themeMode={themeMode}
            type="accent"
          />
          <Scale
            color={greyColor}
            showColorMeta={false}
            themeMode={themeMode}
            type="grey"
          />
          <PreviewBox />

          <Row className={cn("gy-2 gx-2", classes.tokens)}>
            <Col md={12}>
              <h2>Tokenmapping</h2>
            </Col>
            <Col md={4}>
              <h3>Background subtle</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.background.subtle)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Background default</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.background.default)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Component normal</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.component.normal)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Component hover</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.solids.hover)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Component active</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.solids.active)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Border subtle</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.border.subtle)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Border default</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.border.default)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Border strong</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.border.strong)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Solid normal</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.solids.normal)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Solid hover</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.solids.hover)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Solid active</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.solids.active)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Text subtle</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.text.subtle)}
              </div>
            </Col>
            <Col md={4}>
              <h3>Text default</h3>
              <div className={classes.token}>
                {loopTokens(tokenMapping.text.default)}
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
