import type { BuilderState } from "../templates/types";

const DRAFT_STORAGE_KEY = "flodesk-builder-draft";

type SavedDraft = {
  version: 1;
  state: BuilderState;
  savedAt: string;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isBuilderState(value: unknown): value is BuilderState {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.templateId === "string" &&
    isObject(value.page) &&
    Array.isArray(value.elements) &&
    isObject(value.selectedTarget)
  );
}

export function loadSavedDraft(): BuilderState | null {
  try {
    const rawDraft = window.localStorage.getItem(DRAFT_STORAGE_KEY);

    if (!rawDraft) {
      return null;
    }

    const draft = JSON.parse(rawDraft) as unknown;

    if (!isObject(draft) || draft.version !== 1 || !isBuilderState(draft.state)) {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      return null;
    }

    return draft.state;
  } catch {
    return null;
  }
}

export function saveDraft(state: BuilderState) {
  const draft: SavedDraft = {
    version: 1,
    state,
    savedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
}

export function clearSavedDraft() {
  window.localStorage.removeItem(DRAFT_STORAGE_KEY);
}
