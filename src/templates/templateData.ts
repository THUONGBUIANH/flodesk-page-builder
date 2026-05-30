import type { TemplateDefinition } from "./types";

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
      layout: "centered",
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
    name: "Card",
    description: "A compact personal card for a short intro and contact action.",
    accentColor: "#2f241b",
    previewBackground: "#f5efe7",
    page: {
      backgroundColor: "#fffaf3",
      contentWidth: 560,
      layout: "card",
      textColor: "#2f241b",
    },
    elements: [
      {
        id: "editorial-eyebrow",
        type: "eyebrow",
        label: "Role",
        content: "Independent creator",
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
        label: "Name",
        content: "Your Name",
        style: {
          color: "#2f241b",
          fontSize: 46,
          fontWeight: "700",
          textAlign: "left",
        },
      },
      {
        id: "editorial-button",
        type: "button",
        label: "Contact button",
        content: "Contact me",
        style: {
          color: "#fffaf3",
          backgroundColor: "#2f241b",
          fontSize: 15,
          fontWeight: "700",
          textAlign: "left",
          borderRadius: 40,
        },
      },
      {
        id: "editorial-body",
        type: "paragraph",
        label: "Intro",
        content:
          "Designer and builder focused on thoughtful digital experiences, calm systems, and polished customer journeys.",
        style: {
          color: "#5f4b3c",
          fontSize: 17,
          fontWeight: "400",
          textAlign: "left",
        },
      },
    ],
  },
];
