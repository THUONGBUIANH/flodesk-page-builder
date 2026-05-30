import { Box, Button, Flex, IconButton, Text } from "@flodesk/grain";
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
    <Box tag="main" className="builder-page grn-context">
      <Flex tag="header" className="app-header" alignItems="center" justifyContent="space-between">
        <Flex className="header-left" alignItems="center">
          <IconButton
            className="brand-mark brand-mark--button"
            icon={<span className="brand-mark__disc" aria-hidden="true" />}
            type="button"
            aria-label="Start over"
            onClick={onStartOver}
          />
          <Box>
            <Text className="header-kicker" tag="p">
              Editing
            </Text>
            <Text className="header-title" tag="h1" weight="medium">
              {template.name}
            </Text>
          </Box>
        </Flex>
        <Flex className="header-actions" alignItems="center">
          <Text className="autosave-status" tag="span" aria-live="polite">
            {autosaveStatus}
          </Text>
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
        </Flex>
      </Flex>

      <Box className="builder-workspace">
        <PreviewCanvas state={state} onStateChange={onStateChange} />
        <SettingsPanel state={state} onStateChange={onStateChange} />
      </Box>
    </Box>
  );
}
