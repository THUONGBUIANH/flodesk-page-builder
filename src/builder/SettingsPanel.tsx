import { Slider, TextInput, Textarea, TextToggle, TextToggleGroup } from "@flodesk/grain";
import type React from "react";
import { MAX_BUTTON_BORDER_RADIUS } from "../templates/rendering";
import type {
  BuilderElement,
  BuilderState,
  FontWeight,
  PageSettings,
  TextAlign,
} from "../templates/types";

type SettingsPanelProps = {
  state: BuilderState;
  onStateChange: (state: BuilderState) => void;
};

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="settings-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ControlField({ label, children }: FieldProps) {
  return (
    <div className="settings-field">
      <span>{label}</span>
      {children}
    </div>
  );
}

type SliderFieldProps = {
  label: string;
  valueLabel: string;
  children: React.ReactNode;
};

function SliderField({ label, valueLabel, children }: SliderFieldProps) {
  return (
    <div className="settings-field">
      <div className="settings-field__label-row">
        <span>{label}</span>
        <output>{valueLabel}</output>
      </div>
      {children}
    </div>
  );
}

function updatePage(state: BuilderState, onStateChange: (state: BuilderState) => void) {
  return <K extends keyof PageSettings>(key: K, value: PageSettings[K]) => {
    onStateChange({
      ...state,
      page: {
        ...state.page,
        [key]: value,
      },
    });
  };
}

function updateElement(
  state: BuilderState,
  element: BuilderElement,
  onStateChange: (state: BuilderState) => void,
) {
  return (nextElement: BuilderElement) => {
    onStateChange({
      ...state,
      elements: state.elements.map((item) => (item.id === element.id ? nextElement : item)),
    });
  };
}

export function SettingsPanel({ state, onStateChange }: SettingsPanelProps) {
  let selectedElement: BuilderElement | undefined;

  if (state.selectedTarget.type === "element") {
    const selectedElementId = state.selectedTarget.elementId;
    selectedElement = state.elements.find((element) => element.id === selectedElementId);
  }

  if (!selectedElement) {
    const setPage = updatePage(state, onStateChange);

    return (
      <aside className="settings-panel" aria-label="Page settings">
        <div className="settings-panel__header">
          <p>Page settings</p>
          <span>Canvas</span>
        </div>
        <div className="settings-panel__body">
          <Field label="Background color">
            <input
              type="color"
              value={state.page.backgroundColor}
              onChange={(event) => setPage("backgroundColor", event.target.value)}
            />
          </Field>
          <Field label="Text color">
            <input
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
        </div>
      </aside>
    );
  }

  const setElement = updateElement(state, selectedElement, onStateChange);
  const canUseButtonStyles = selectedElement.type === "button";
  const elementColor = selectedElement.style.color ?? state.page.textColor;
  const buttonBackgroundColor = selectedElement.style.backgroundColor ?? state.page.textColor;
  const elementFontSize = selectedElement.style.fontSize ?? 16;
  const elementBorderRadius = Math.min(
    selectedElement.style.borderRadius ?? 8,
    MAX_BUTTON_BORDER_RADIUS,
  );

  return (
    <aside className="settings-panel" aria-label={`${selectedElement.label} settings`}>
      <div className="settings-panel__header">
        <p>{selectedElement.label} settings</p>
        <span>{selectedElement.type}</span>
      </div>
      <div className="settings-panel__body">
        <Field label="Content">
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

        <Field label="Color">
          <input
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
          <Field label="Background">
            <input
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
      </div>
    </aside>
  );
}
