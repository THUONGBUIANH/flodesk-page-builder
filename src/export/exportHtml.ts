import type { BuilderElement, BuilderState } from "../templates/types";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getButtonAlignmentStyle(element: BuilderElement) {
  if (element.type !== "button") {
    return "";
  }

  if (element.style.textAlign === "right") {
    return "margin-left: auto; margin-right: 0";
  }

  if (element.style.textAlign === "center") {
    return "margin-left: auto; margin-right: auto";
  }

  return "margin-left: 0; margin-right: auto";
}

function renderElement(element: BuilderElement) {
  const style = [
    `color: ${element.style.color ?? "inherit"}`,
    element.style.backgroundColor ? `background-color: ${element.style.backgroundColor}` : "",
    element.style.fontSize ? `font-size: ${element.style.fontSize}px` : "",
    element.style.fontWeight ? `font-weight: ${element.style.fontWeight}` : "",
    element.style.textAlign ? `text-align: ${element.style.textAlign}` : "",
    element.style.borderRadius ? `border-radius: ${element.style.borderRadius}px` : "",
    getButtonAlignmentStyle(element),
  ]
    .filter(Boolean)
    .join("; ");

  const content = escapeHtml(element.content);

  if (element.type === "heading") {
    return `<h1 class="page-heading" style="${style}">${content}</h1>`;
  }

  if (element.type === "paragraph") {
    return `<p class="page-paragraph" style="${style}">${content}</p>`;
  }

  if (element.type === "button") {
    return `<a class="page-button" href="#" style="${style}">${content}</a>`;
  }

  return `<div class="page-eyebrow" style="${style}">${content}</div>`;
}

export function buildStaticHtml(state: BuilderState) {
  const body = state.elements.map(renderElement).join("\n        ");
  const isCardLayout = state.page.layout === "card";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Exported Flodesk Page</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background: ${isCardLayout ? "#f6f4ef" : state.page.backgroundColor};
        color: ${state.page.textColor};
      }

      .page-shell {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 48px 20px;
      }

      .page-content {
        width: min(100%, ${state.page.contentWidth}px);
      }

      .page-content--card {
        max-width: 560px;
        border: 1px solid rgba(47, 36, 27, 0.18);
        border-radius: 8px;
        background: ${state.page.backgroundColor};
        box-shadow: 0 24px 60px rgba(47, 36, 27, 0.14);
        padding: 42px;
      }

      .page-content--card .page-eyebrow {
        margin-bottom: 28px;
      }

      .page-content--card .page-heading {
        margin-bottom: 18px;
      }

      .page-content--card .page-button {
        margin: 30px 0 0;
      }

      .page-content--card .page-paragraph {
        max-width: 420px;
        margin: 0;
      }

      .page-eyebrow {
        margin-bottom: 16px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .page-heading {
        margin: 0 0 20px;
        line-height: 1.05;
      }

      .page-paragraph {
        margin: 0 auto 28px;
        max-width: 680px;
        line-height: 1.65;
      }

      .page-button {
        display: flex;
        width: max-content;
        min-height: 44px;
        align-items: center;
        justify-content: center;
        padding: 0 22px;
        text-decoration: none;
      }

      @media (max-width: 720px) {
        .page-content--card {
          padding: 30px;
        }
      }
    </style>
  </head>
  <body>
    <main class="page-shell">
      <section class="page-content${isCardLayout ? " page-content--card" : ""}" aria-label="Exported page">
        ${body}
      </section>
    </main>
  </body>
</html>`;
}

export function downloadStaticHtml(state: BuilderState) {
  const html = buildStaticHtml(state);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "flodesk-page.html";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
