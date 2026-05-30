import { MAX_BUTTON_BORDER_RADIUS } from "../constants";
import type { BuilderElement, BuilderState, PageSettings, TemplateDefinition } from "../templates/types";

export function createStateFromTemplate(template: TemplateDefinition): BuilderState {
  return {
    templateId: template.id,
    page: { ...template.page },
    elements: template.elements.map((element) => ({
      ...element,
      style: { ...element.style },
    })),
    selectedTarget: { type: "page" },
  };
}

export function getSelectedElement(state: BuilderState): BuilderElement | undefined {
  const selectedTarget = state.selectedTarget;

  if (selectedTarget.type !== "element") {
    return undefined;
  }

  return state.elements.find((element) => element.id === selectedTarget.elementId);
}

export function updatePageSetting<K extends keyof PageSettings>(
  state: BuilderState,
  key: K,
  value: PageSettings[K],
): BuilderState {
  return {
    ...state,
    page: {
      ...state.page,
      [key]: value,
    },
  };
}

export function updateElementInState(
  state: BuilderState,
  nextElement: BuilderElement,
): BuilderState {
  return {
    ...state,
    elements: state.elements.map((element) =>
      element.id === nextElement.id ? nextElement : element,
    ),
  };
}

function normalizeElement(element: BuilderElement): BuilderElement {
  if (element.type !== "button" || !element.style.borderRadius) {
    return element;
  }

  return {
    ...element,
    style: {
      ...element.style,
      borderRadius: Math.min(element.style.borderRadius, MAX_BUTTON_BORDER_RADIUS),
    },
  };
}

export function normalizeStateForTemplate(
  state: BuilderState,
  template: TemplateDefinition,
): BuilderState {
  return {
    ...state,
    page: {
      ...state.page,
      layout: template.page.layout,
    },
    elements: state.elements.map(normalizeElement),
  };
}
