import {
  Box,
  FieldLabel,
  Flex,
  Slider,
  Text,
  TextInput,
  Textarea,
  TextToggle,
  TextToggleGroup,
} from "@flodesk/grain";
import type React from "react";
import {
  getSelectedElement,
  updateElementInState,
  updatePageSetting,
} from "./builderState";
import { MAX_BUTTON_BORDER_RADIUS } from "../constants";
import type { BuilderState, FontWeight, TextAlign } from "../templates/types";

type SettingsPanelProps = {
  state: BuilderState;
  onStateChange: (state: BuilderState) => void;
};

type FieldProps = {
  htmlFor?: string;
  label: string;
  children: React.ReactNode;
};

function Field({ htmlFor, label, children }: FieldProps) {
  return (
    <Box className="settings-field">
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      {children}
    </Box>
  );
}

function ControlField({ label, children }: FieldProps) {
  return (
    <Box className="settings-field">
      <FieldLabel>{label}</FieldLabel>
      {children}
    </Box>
  );
}

type SliderFieldProps = {
  label: string;
  valueLabel: string;
  children: React.ReactNode;
};

function SliderField({ label, valueLabel, children }: SliderFieldProps) {
  return (
    <Box className="settings-field">
      <Flex className="settings-field__label-row" alignItems="center" justifyContent="space-between">
        <FieldLabel>{label}</FieldLabel>
        <output>{valueLabel}</output>
      </Flex>
      {children}
    </Box>
  );
}

export function SettingsPanel({ state, onStateChange }: SettingsPanelProps) {
  const selectedElement = getSelectedElement(state);

  if (!selectedElement) {
    const setPage = <K extends keyof typeof state.page>(key: K, value: (typeof state.page)[K]) => {
      onStateChange(updatePageSetting(state, key, value));
    };

    return (
      <Box tag="aside" className="settings-panel" aria-label="Page settings">
        <Flex className="settings-panel__header" alignItems="center" justifyContent="space-between">
          <Text tag="p" weight="medium">
            Page settings
          </Text>
          <Text tag="span" color="content2">
            Canvas
          </Text>
        </Flex>
        <Box className="settings-panel__body">
          <Field htmlFor="page-background-color" label="Background color">
            <input
              id="page-background-color"
              type="color"
              value={state.page.backgroundColor}
              onChange={(event) => setPage("backgroundColor", event.target.value)}
            />
          </Field>
          <Field htmlFor="page-text-color" label="Text color">
            <input
              id="page-text-color"
              type="color"
              value={state.page.textColor}
              onChange={(event) => setPage("textColor", event.target.value)}
            />
          </Field>
          <SliderField label="Page width" valueLabel={`${state.page.contentWidth}px`}>
            <Slider
              aria-label="Page width"
              min={520}
              max={980}
              step={20}
              value={state.page.contentWidth}
              onChange={(event) => setPage("contentWidth", Number(event.target.value))}
            />
          </SliderField>
        </Box>
      </Box>
    );
  }

  const setElement = (nextElement: typeof selectedElement) => {
    onStateChange(updateElementInState(state, nextElement));
  };
  const canUseButtonStyles = selectedElement.type === "button";
  const elementColor = selectedElement.style.color ?? state.page.textColor;
  const buttonBackgroundColor = selectedElement.style.backgroundColor ?? state.page.textColor;
  const elementFontSize = selectedElement.style.fontSize ?? 16;
  const elementBorderRadius = Math.min(
    selectedElement.style.borderRadius ?? 8,
    MAX_BUTTON_BORDER_RADIUS,
  );

  return (
    <Box tag="aside" className="settings-panel" aria-label={`${selectedElement.label} settings`}>
      <Flex className="settings-panel__header" alignItems="center" justifyContent="space-between">
        <Text tag="p" weight="medium">
          {selectedElement.label} settings
        </Text>
        <Text tag="span" color="content2">
          {selectedElement.type}
        </Text>
      </Flex>
      <Box className="settings-panel__body">
        <Field htmlFor={`${selectedElement.id}-content`} label="Content">
          {selectedElement.type === "paragraph" ? (
            <Textarea
              id={`${selectedElement.id}-content`}
              rows={5}
              value={selectedElement.content}
              onChange={(event) =>
                setElement({
                  ...selectedElement,
                  content: event.target.value,
                })
              }
            />
          ) : (
            <TextInput
              id={`${selectedElement.id}-content`}
              type="text"
              value={selectedElement.content}
              onChange={(event) =>
                setElement({
                  ...selectedElement,
                  content: event.target.value,
                })
              }
            />
          )}
        </Field>

        <Field htmlFor={`${selectedElement.id}-color`} label="Color">
          <input
            id={`${selectedElement.id}-color`}
            type="color"
            value={elementColor}
            onChange={(event) =>
              setElement({
                ...selectedElement,
                style: { ...selectedElement.style, color: event.target.value },
              })
            }
          />
        </Field>

        {canUseButtonStyles ? (
          <Field htmlFor={`${selectedElement.id}-background`} label="Background">
            <input
              id={`${selectedElement.id}-background`}
              type="color"
              value={buttonBackgroundColor}
              onChange={(event) =>
                setElement({
                  ...selectedElement,
                  style: { ...selectedElement.style, backgroundColor: event.target.value },
                })
              }
            />
          </Field>
        ) : null}

        <SliderField label="Font size" valueLabel={`${elementFontSize}px`}>
          <Slider
            aria-label="Font size"
            min={12}
            max={selectedElement.type === "heading" ? 64 : 28}
            value={elementFontSize}
            onChange={(event) =>
              setElement({
                ...selectedElement,
                style: { ...selectedElement.style, fontSize: Number(event.target.value) },
              })
            }
          />
        </SliderField>

        <ControlField label="Font weight">
          <TextToggleGroup hasFullWidth role="radiogroup" aria-label="Font weight">
            {[
              ["300", "Light"],
              ["400", "Regular"],
              ["700", "Bold"],
            ].map(([value, label]) => (
              <TextToggle
                aria-checked={selectedElement.style.fontWeight === value}
                isActive={selectedElement.style.fontWeight === value}
                key={value}
                role="radio"
                onClick={() =>
                  setElement({
                    ...selectedElement,
                    style: { ...selectedElement.style, fontWeight: value as FontWeight },
                  })
                }
              >
                {label}
              </TextToggle>
            ))}
          </TextToggleGroup>
        </ControlField>

        <ControlField label="Alignment">
          <TextToggleGroup hasFullWidth role="radiogroup" aria-label="Text alignment">
            {[
              ["left", "Left"],
              ["center", "Center"],
              ["right", "Right"],
            ].map(([value, label]) => (
              <TextToggle
                aria-checked={selectedElement.style.textAlign === value}
                isActive={selectedElement.style.textAlign === value}
                key={value}
                role="radio"
                onClick={() =>
                  setElement({
                    ...selectedElement,
                    style: { ...selectedElement.style, textAlign: value as TextAlign },
                  })
                }
              >
                {label}
              </TextToggle>
            ))}
          </TextToggleGroup>
        </ControlField>

        {canUseButtonStyles ? (
          <SliderField label="Corner radius" valueLabel={`${elementBorderRadius}px`}>
            <Slider
              aria-label="Corner radius"
              min={0}
              max={MAX_BUTTON_BORDER_RADIUS}
              value={elementBorderRadius}
              onChange={(event) =>
                setElement({
                  ...selectedElement,
                  style: { ...selectedElement.style, borderRadius: Number(event.target.value) },
                })
              }
            />
          </SliderField>
        ) : null}
      </Box>
    </Box>
  );
}
