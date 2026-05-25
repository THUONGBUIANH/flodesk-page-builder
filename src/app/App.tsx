import { useEffect, useMemo, useState } from "react";
import { clearSavedDraft, loadSavedDraft, saveDraft } from "../builder/autosave";
import { BuilderPage } from "../builder/BuilderPage";
import { TemplateGallery } from "../builder/TemplateGallery";
import { createStateFromTemplate, templates } from "../templates/templateData";
import type { BuilderState } from "../templates/types";

export function App() {
  const [builderState, setBuilderState] = useState<BuilderState | null>(() => loadSavedDraft());
  const [autosaveStatus, setAutosaveStatus] = useState<string>(() =>
    builderState ? "Draft restored" : "",
  );

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === builderState?.templateId),
    [builderState?.templateId],
  );

  useEffect(() => {
    if (!builderState) {
      return undefined;
    }

    setAutosaveStatus("Saving...");

    const timeoutId = window.setTimeout(() => {
      saveDraft(builderState);
      setAutosaveStatus("Saved locally");
    }, 450);

    return () => window.clearTimeout(timeoutId);
  }, [builderState]);

  if (!builderState || !selectedTemplate) {
    return (
      <TemplateGallery
        templates={templates}
        onSelectTemplate={(templateId) => {
          const template = templates.find((item) => item.id === templateId);
          if (template) {
            setBuilderState(createStateFromTemplate(template));
          }
        }}
      />
    );
  }

  return (
    <BuilderPage
      state={builderState}
      template={selectedTemplate}
      autosaveStatus={autosaveStatus}
      onStartOver={() => {
        clearSavedDraft();
        setAutosaveStatus("");
        setBuilderState(null);
      }}
      onStateChange={setBuilderState}
    />
  );
}
