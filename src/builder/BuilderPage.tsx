import { Button } from "@flodesk/grain";
import { downloadStaticHtml } from "../export/exportHtml";
import type { BuilderState, TemplateDefinition } from "../templates/types";
import { PreviewCanvas } from "./PreviewCanvas";
import { SettingsPanel } from "./SettingsPanel";

type BuilderPageProps = {
  state: BuilderState;
  template: TemplateDefinition;
  autosaveStatus: string;
  onStartOver: () => void;
  onStateChange: (state: BuilderState) => void;
};

export function BuilderPage({
  state,
  template,
  autosaveStatus,
  onStartOver,
  onStateChange,
}: BuilderPageProps) {
  return (
    <main className="builder-page grn-context">
      <header className="app-header">
        <div className="header-left">
          <button
            className="brand-mark brand-mark--button"
            type="button"
            aria-label="Start over"
            onClick={onStartOver}
          />
          <div>
            <p className="header-kicker">Editing</p>
            <h1>{template.name}</h1>
          </div>
        </div>
        <div className="header-actions">
          <span className="autosave-status" aria-live="polite">
            {autosaveStatus}
          </span>
          <Button className="secondary-button" type="button" variant="neutral" onClick={onStartOver}>
            Start over
          </Button>
          <Button
            className="primary-button"
            type="button"
            variant="neutral"
            onClick={() => downloadStaticHtml(state)}
          >
            Export
          </Button>
        </div>
      </header>

      <div className="builder-workspace">
        <PreviewCanvas state={state} onStateChange={onStateChange} />
        <SettingsPanel state={state} onStateChange={onStateChange} />
      </div>
    </main>
  );
}
