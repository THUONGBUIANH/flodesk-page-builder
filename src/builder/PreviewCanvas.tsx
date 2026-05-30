import { Box } from "@flodesk/grain";
import type React from "react";
import { CARD_LAYOUT_BACKGROUND } from "../constants";
import type { BuilderElement, BuilderState, SelectedTarget } from "../templates/types";

type PreviewCanvasProps = {
  state: BuilderState;
  onStateChange: (state: BuilderState) => void;
};

function isSelected(selectedTarget: SelectedTarget, elementId: string) {
  return selectedTarget.type === "element" && selectedTarget.elementId === elementId;
}

function elementClassName(element: BuilderElement, selected: boolean) {
  return ["preview-element", `preview-element--${element.type}`, selected ? "is-selected" : ""]
    .filter(Boolean)
    .join(" ");
}

function buttonAlignmentStyle(element: BuilderElement): React.CSSProperties {
  if (element.type !== "button") {
    return {};
  }

  if (element.style.textAlign === "right") {
    return { marginLeft: "auto", marginRight: 0 };
  }

  if (element.style.textAlign === "center") {
    return { marginLeft: "auto", marginRight: "auto" };
  }

  return { marginLeft: 0, marginRight: "auto" };
}

function previewPageStyle(state: BuilderState): React.CSSProperties {
  return {
    backgroundColor: state.page.layout === "card" ? CARD_LAYOUT_BACKGROUND : state.page.backgroundColor,
    color: state.page.textColor,
    "--card-background": state.page.backgroundColor,
  } as React.CSSProperties;
}

export function PreviewCanvas({ state, onStateChange }: PreviewCanvasProps) {
  const selectPage = () => {
    onStateChange({ ...state, selectedTarget: { type: "page" } });
  };

  const selectElement = (elementId: string) => {
    onStateChange({ ...state, selectedTarget: { type: "element", elementId } });
  };

  return (
    <Box tag="section" className="preview-region" aria-label="Page preview">
      <Box
        className={[
          "preview-page",
          state.page.layout === "card" ? "preview-page--card" : "",
          state.selectedTarget.type === "page" ? "is-selected" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={previewPageStyle(state)}
        onClick={selectPage}
      >
        <Box className="preview-page__content" style={{ maxWidth: state.page.contentWidth }}>
          {state.elements.map((element) => {
            const selected = isSelected(state.selectedTarget, element.id);
            const sharedProps = {
              className: elementClassName(element, selected),
              style: {
                color: element.style.color,
                backgroundColor: element.style.backgroundColor,
                fontSize: element.style.fontSize,
                fontWeight: element.style.fontWeight,
                textAlign: element.style.textAlign,
                borderRadius: element.style.borderRadius,
                ...buttonAlignmentStyle(element),
              },
              onClick: (event: React.MouseEvent) => {
                event.stopPropagation();
                selectElement(element.id);
              },
            };

            if (element.type === "heading") {
              return (
                <h2 key={element.id} {...sharedProps}>
                  {element.content}
                </h2>
              );
            }

            if (element.type === "paragraph") {
              return (
                <p key={element.id} {...sharedProps}>
                  {element.content}
                </p>
              );
            }

            if (element.type === "button") {
              return (
                <button key={element.id} type="button" {...sharedProps}>
                  {element.content}
                </button>
              );
            }

            return (
              <div key={element.id} {...sharedProps}>
                {element.content}
              </div>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
