export type ElementType = "eyebrow" | "heading" | "paragraph" | "button";

export type FontWeight = "300" | "400" | "700";

export type TextAlign = "left" | "center" | "right";

export type PageLayout = "centered" | "card";

export type PageSettings = {
  backgroundColor: string;
  contentWidth: number;
  layout?: PageLayout;
  textColor: string;
};

export type BuilderElement = {
  id: string;
  type: ElementType;
  label: string;
  content: string;
  style: {
    color?: string;
    backgroundColor?: string;
    fontSize?: number;
    fontWeight?: FontWeight;
    textAlign?: TextAlign;
    borderRadius?: number;
  };
};

export type TemplateDefinition = {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  previewBackground: string;
  page: PageSettings;
  elements: BuilderElement[];
};

export type SelectedTarget =
  | { type: "page" }
  | { type: "element"; elementId: string };

export type BuilderState = {
  templateId: string;
  page: PageSettings;
  elements: BuilderElement[];
  selectedTarget: SelectedTarget;
};
