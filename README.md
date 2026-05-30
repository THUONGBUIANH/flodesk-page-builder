# Flodesk FE Home Assignment

React static page builder for non-technical users. Users can choose a template, edit page-level and element-level settings with immediate preview updates, and export a standalone HTML page.

## Tech Stack

- React
- TypeScript
- Vite
- pnpm
- `@flodesk/grain` as the app provider, injected global style base, and design-token foundation

No Tailwind, MUI, Chakra, Bootstrap, or third-party CSS/UI framework is used.

## Getting Started

```bash
pnpm install
pnpm dev
```

Build:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Core User Flow

1. Choose one of the available templates.
2. Click the page canvas to edit page settings.
3. Click text or button elements to edit element settings.
4. See changes update immediately in the preview.
5. Click Export to download a standalone `flodesk-page.html` file.

## Project Structure

- `src/app`: application shell and top-level flow.
- `src/builder`: builder screens, editor controls, autosave, and builder state helpers.
- `src/constants`: shared constants for builder limits and preview/export layout styles.
- `src/export`: standalone HTML generation and download logic.
- `src/templates`: serializable template data and shared builder types.
- `src/styles`: global styles and assignment-specific UI polish.

## Implemented Scope

- Template gallery with 2 visually distinct templates.
- Builder view with header, preview canvas, and settings panel.
- Page settings:
  - background color,
  - text color,
  - page width.
- Element settings:
  - content,
  - text color,
  - font size,
  - font weight,
  - alignment.
- Button-specific settings:
  - background color,
  - corner radius.
- Static HTML export with inline CSS and no React/runtime dependency.
- Lightweight autosave to localStorage with automatic draft restore.
- Start-over action for intentionally discarding the saved draft.

## Product And Technical Decisions

The template data is serializable and shared by both the live preview and export flow. This keeps the implementation predictable and makes it easy to add more templates without changing the renderer deeply.

Grain is used as the primary design-system foundation through `GrainProvider`, its injected global styles, and Grain components such as `Button`, `TextInput`, `Textarea`, `Slider`, and `TextToggle`. Assignment-specific surfaces, such as the preview canvas and template cards, are custom-built on top of the same visual foundation rather than pulling in another UI framework.

App chrome colors are defined as semantic CSS variables, with Grain tokens used where practical. Template colors remain serializable data because they are part of the user's page design and must also be written into the standalone HTML export.

The editor intentionally focuses on a small set of meaningful controls. That keeps the assignment aligned with the acceptance criteria and avoids spending time on a partial drag-and-drop builder.

Autosave is intentionally local-only. It improves the editing experience for non-technical users without adding backend scope.

## Tradeoffs

- No drag-and-drop layout editing.
- No uploaded assets.
- No rich text editor.
- No hosted publish/share flow.

These are valuable product features, but they are outside the assignment's core path.

## Submission Notes

Recommended submission format:

- Accessible codebase through GitHub, GitLab, or ZIP.
- Optional deployed link through Vercel, Netlify, or another static host for quick review.
- Actual focused time spent.
- Any known tradeoffs or follow-up ideas.

A deployed link is a convenience for product review; it does not replace source-code access.

## Bonus Question: Feature To Cut

If time were constrained, I would cut advanced layout manipulation such as drag-and-drop and broad element support. The core assignment value is the complete path from template selection to live customization to static export. A smaller set of polished editable elements is more useful than a wide editor with shallow behavior.

## Bonus Question: Product Improvement

I would extend autosave with undo/redo.

Non-technical users often explore by trial and error. This implementation already adds local autosave to prevent accidental loss; undo/redo would make experimentation feel even safer. I would implement this with a bounded history stack and undo/redo actions in the header. Switching templates would reset the history to avoid mixing unrelated page states.

## Time Estimate

Initial estimate: 14-18 focused hours for a polished solution.

Actual time spent: approximately 14-18 focused hours.
