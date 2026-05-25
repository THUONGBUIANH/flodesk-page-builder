import { TextInput, Textarea } from "@flodesk/grain";
import type React from "react";
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
          <Field label="Page width">
            <input
              type="range"
              min="520"
              max="980"
              step="20"
              value={state.page.contentWidth}
              onChange={(event) => setPage("contentWidth", Number(event.target.value))}
            />
            <output>{state.page.contentWidth}px</output>
          </Field>
        </div>
      </aside>
    );
  }

  const setElement = updateElement(state, selectedElement, onStateChange);
  const canUseButtonStyles = selectedElement.type === "button";

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
            value={selectedElement.style.color ?? "#111827"}
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
              value={selectedElement.style.backgroundColor ?? "#111827"}
              onChange={(event) =>
                setElement({
                  ...selectedElement,
                  style: { ...selectedElement.style, backgroundColor: event.target.value },
                })
              }
            />
          </Field>
        ) : null}

        <Field label="Font size">
          <input
            type="range"
            min="12"
            max={selectedElement.type === "heading" ? "64" : "28"}
            value={selectedElement.style.fontSize ?? 16}
            onChange={(event) =>
              setElement({
                ...selectedElement,
                style: { ...selectedElement.style, fontSize: Number(event.target.value) },
              })
            }
          />
          <output>{selectedElement.style.fontSize}px</output>
        </Field>

        <div className="settings-field">
          <span>Font weight</span>
          <div className="segmented-control" role="radiogroup" aria-label="Font weight">
            {[
              ["300", "Light"],
              ["400", "Regular"],
              ["700", "Bold"],
            ].map(([value, label]) => (
              <button
                className={selectedElement.style.fontWeight === value ? "is-active" : ""}
                key={value}
                type="button"
                onClick={() =>
                  setElement({
                    ...selectedElement,
                    style: { ...selectedElement.style, fontWeight: value as FontWeight },
                  })
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-field">
          <span>Alignment</span>
          <div className="segmented-control" role="radiogroup" aria-label="Text alignment">
            {[
              ["left", "Left"],
              ["center", "Center"],
              ["right", "Right"],
            ].map(([value, label]) => (
              <button
                className={selectedElement.style.textAlign === value ? "is-active" : ""}
                key={value}
                type="button"
                onClick={() =>
                  setElement({
                    ...selectedElement,
                    style: { ...selectedElement.style, textAlign: value as TextAlign },
                  })
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {canUseButtonStyles ? (
          <Field label="Corner radius">
            <input
              type="range"
              min="0"
              max="40"
              value={selectedElement.style.borderRadius ?? 8}
              onChange={(event) =>
                setElement({
                  ...selectedElement,
                  style: { ...selectedElement.style, borderRadius: Number(event.target.value) },
                })
              }
            />
            <output>{selectedElement.style.borderRadius}px</output>
          </Field>
        ) : null}
      </div>
    </aside>
  );
}
