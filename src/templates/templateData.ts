import type { BuilderState, TemplateDefinition } from "./types";

export const templates: TemplateDefinition[] = [
  {
    id: "modern-launch",
    name: "Modern Launch",
    description: "A crisp announcement page for a product, offer, or waitlist.",
    accentColor: "#2563eb",
    previewBackground: "#e8f0ff",
    page: {
      backgroundColor: "#e8f0ff",
      contentWidth: 760,
      textColor: "#111827",
    },
    elements: [
      {
        id: "launch-eyebrow",
        type: "eyebrow",
        label: "Eyebrow",
        content: "Early access opens soon",
        style: {
          color: "#2563eb",
          fontSize: 14,
          fontWeight: "700",
          textAlign: "center",
        },
      },
      {
        id: "launch-heading",
        type: "heading",
        label: "Title",
        content: "Build a better launch page in minutes",
        style: {
          color: "#111827",
          fontSize: 42,
          fontWeight: "700",
          textAlign: "center",
        },
      },
      {
        id: "launch-body",
        type: "paragraph",
        label: "Intro copy",
        content:
          "Start from a focused template, adjust the message and style, then export a clean static page that is ready to share.",
        style: {
          color: "#374151",
          fontSize: 17,
          fontWeight: "400",
          textAlign: "center",
        },
      },
      {
        id: "launch-button",
        type: "button",
        label: "CTA button",
        content: "Join the list",
        style: {
          color: "#ffffff",
          backgroundColor: "#2563eb",
          fontSize: 16,
          fontWeight: "700",
          textAlign: "center",
          borderRadius: 8,
        },
      },
    ],
  },
  {
    id: "editorial-note",
    name: "Editorial Note",
    description: "A warm, editorial layout for a newsletter or personal update.",
    accentColor: "#b45309",
    previewBackground: "#fff7ed",
    page: {
      backgroundColor: "#fff7ed",
      contentWidth: 680,
      textColor: "#2f241b",
    },
    elements: [
      {
        id: "editorial-eyebrow",
        type: "eyebrow",
        label: "Section label",
        content: "Letter from the studio",
        style: {
          color: "#b45309",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "left",
        },
      },
      {
        id: "editorial-heading",
        type: "heading",
        label: "Title",
        content: "A calmer way to introduce your next idea",
        style: {
          color: "#2f241b",
          fontSize: 38,
          fontWeight: "700",
          textAlign: "left",
        },
      },
      {
        id: "editorial-body",
        type: "paragraph",
        label: "Body copy",
        content:
          "Use this template for a refined announcement, a personal note, or a softer campaign page with room for thoughtful copy.",
        style: {
          color: "#5f4b3c",
          fontSize: 18,
          fontWeight: "400",
          textAlign: "left",
        },
      },
      {
        id: "editorial-button",
        type: "button",
        label: "CTA button",
        content: "Read more",
        style: {
          color: "#fffaf3",
          backgroundColor: "#2f241b",
          fontSize: 15,
          fontWeight: "700",
          textAlign: "center",
          borderRadius: 999,
        },
      },
    ],
  },
];

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
