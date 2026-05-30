import { Box, Button, Flex, Text } from "@flodesk/grain";
import type { TemplateDefinition } from "../templates/types";

type TemplateGalleryProps = {
  templates: TemplateDefinition[];
  onSelectTemplate: (templateId: string) => void;
};

export function TemplateGallery({ templates, onSelectTemplate }: TemplateGalleryProps) {
  return (
    <Box tag="main" className="template-page grn-context">
      <Flex tag="header" className="app-header" alignItems="center" justifyContent="space-between">
        <Box className="brand-mark" aria-hidden="true" />
        <Button className="secondary-button" type="button" isDisabled>
          Export
        </Button>
      </Flex>

      <Box tag="section" className="template-picker" aria-labelledby="template-picker-title">
        <Text className="screen-kicker" tag="p">
          Static page builder
        </Text>
        <Text id="template-picker-title" tag="h1" weight="medium">
          Choose a template to start
        </Text>
        <Box className="template-grid">
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
        </Box>
      </Box>
    </Box>
  );
}
