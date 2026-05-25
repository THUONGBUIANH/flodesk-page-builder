import { Button } from "@flodesk/grain";
import type { TemplateDefinition } from "../templates/types";

type TemplateGalleryProps = {
  templates: TemplateDefinition[];
  onSelectTemplate: (templateId: string) => void;
};

export function TemplateGallery({ templates, onSelectTemplate }: TemplateGalleryProps) {
  return (
    <main className="template-page grn-context">
      <header className="app-header">
        <div className="brand-mark" aria-hidden="true" />
        <Button className="secondary-button" type="button" isDisabled>
          Export
        </Button>
      </header>

      <section className="template-picker" aria-labelledby="template-picker-title">
        <p className="screen-kicker">Static page builder</p>
        <h1 id="template-picker-title">Choose a template to start</h1>
        <div className="template-grid">
          {templates.map((template) => (
            <button
              className="template-card"
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate(template.id)}
            >
              <span
                className="template-card__preview"
                style={{
                  background: template.previewBackground,
                  borderColor: template.accentColor,
                }}
              >
                <span style={{ background: template.accentColor }} />
              </span>
              <span className="template-card__body">
                <strong>{template.name}</strong>
                <small>{template.description}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
