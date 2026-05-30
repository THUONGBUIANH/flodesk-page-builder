# AGENTS.md

## Project Context

This repository contains a Flodesk frontend home assignment: a React-based static page builder that lets users choose a template, edit page and element settings, preview changes live, and export a standalone HTML file.

## Assignment Rules

- Use React for the UI.
- Use `@flodesk/grain` as the component and styling foundation.
- Use `pnpm` for package management.
- Do not use Tailwind, MUI, Chakra, Bootstrap, or other third-party CSS/UI frameworks.
- Exported HTML must open directly in a browser without build tooling.
- Keep the core flow simple enough for a non-technical user to complete in a few minutes.

## Folder Structure

- `src/app`: application shell and top-level providers.
- `src/builder`: builder screens, editing components, autosave, and builder state helpers.
- `src/constants`: shared builder/export constants used across app, preview, and export logic.
- `src/export`: static HTML export logic.
- `src/templates`: template data and shared builder types.
- `src/styles`: global styles and assignment-specific UI styling.

## Implementation Guidance

- Prefer small, explicit React components over broad abstractions.
- Keep template data serializable so preview and export can share the same source of truth.
- Keep persisted draft data serializable and versioned when changing autosave behavior.
- Use Grain components as the default for app UI, layout, text, buttons, form controls, toggles, and sliders.
- Use Grain color, shadow, radius, spacing, typography, and transition tokens as the default styling source.
- Build custom controls or custom CSS only when Grain does not provide a suitable component/token, or when the surface is exported page content that must stay standalone and serializable.
- Keep template/page colors as serializable export data when they are part of the user's generated page design.
- Add new editable settings only when they improve the assignment flow.
- Treat drag-and-drop, persistence, uploads, and publishing as out of scope unless explicitly requested.

## Verification

Before considering work complete:

- Run `pnpm install` if dependencies are not installed.
- Run `pnpm build`.
- Run `pnpm dev` and manually verify:
  - template selection,
  - page settings,
  - element settings,
  - live preview updates,
  - HTML export opens standalone.

## Communication Notes

If dependency installation is blocked by registry/network access, keep the source code complete and report the exact blocked command. Do not replace `@flodesk/grain` with a forbidden UI framework.
