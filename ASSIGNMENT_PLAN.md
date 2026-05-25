# Flodesk FE Home Assignment Plan

## Goal

Build a React-based static page builder for non-technical users. The user should be able to choose a template, customize page-level and element-level settings with immediate preview updates, and export the result as a standalone static HTML file.

## Source Requirements

From the assignment PDF:

- Use React for the UI.
- Use `@flodesk/grain` as the component and styling foundation.
- Do not use third-party CSS/UI frameworks such as Tailwind, MUI, Chakra, or Bootstrap.
- Provide at least 2 templates with different look and feel.
- Allow users to browse/select templates.
- Allow users to click into parts of the page and adjust appearance.
- Support configurable settings at two levels:
  - Page settings.
  - Element settings.
- Reflect changes immediately in the preview.
- Export the final page to static HTML.
- The exported HTML must open correctly in a browser without additional tooling.

## Assumptions

- The app can be implemented as a client-side React app using Vite.
- Export can produce a single `.html` file with inline CSS and static markup.
- At least 2 templates are required; a third template is optional polish.
- Element editing can focus on a meaningful subset rather than a full website builder.
- Persistence, drag-and-drop, image upload, undo/redo, and publishing are nice-to-have, not required by the brief.

## Proposed Scope

### Must Have

- Template gallery screen.
- At least 2 visually distinct templates.
- Builder screen with:
  - Top header.
  - Export button.
  - Live page preview.
  - Settings sidebar.
- Page-level settings:
  - Background color.
  - Page width.
- Element-level settings for text elements:
  - Content.
  - Text color.
  - Font size.
  - Font weight.
  - Alignment if time allows.
- Button element settings if the selected template includes a CTA:
  - Text.
  - Background color.
  - Text color.
  - Border radius.
- Selected element outline/indicator in preview.
- Export to standalone HTML.
- README with setup, run, export instructions, tradeoffs, and bonus answers.

### Should Have

- Local state model that makes templates easy to add.
- Responsive preview behavior for smaller screens.
- Basic accessibility considerations:
  - Button labels.
  - Form labels.
  - Keyboard-friendly inputs where practical.
- Small amount of visual polish so the assignment feels product-minded, not just technically complete.

### Nice To Have

- Third template.
- LocalStorage autosave.
- Undo/redo.
- Mobile/desktop preview toggle.
- Image URL editing.
- More element types.

### Out Of Scope

- Drag-and-drop layout editing.
- Rich text editor.
- User authentication.
- Backend/API.
- Real image uploads.
- Hosted publishing/share links.
- Exporting a ZIP with external assets.

## Product Approach

The main product risk is not technical complexity; it is making the builder understandable without instructions. The implementation should optimize for a short path:

1. User lands on template gallery.
2. User chooses a visually distinct starting point.
3. User clicks page or element in preview.
4. Settings panel immediately changes to match the selected target.
5. User edits a few obvious controls.
6. User exports.

The UI should avoid advanced builder concepts unless they directly support this flow.

## Technical Approach

### Suggested Stack

- React
- TypeScript
- Vite
- `@flodesk/grain`
- Plain CSS/CSS modules or Grain-supported styling patterns

### Suggested Structure

```text
src/
  app/
    App.tsx
  builder/
    BuilderPage.tsx
    PreviewCanvas.tsx
    SettingsPanel.tsx
    TemplateGallery.tsx
  export/
    exportHtml.ts
  templates/
    templateData.ts
    types.ts
  styles/
    global.css
```

### State Model

Use a single builder state object:

```ts
type BuilderState = {
  templateId: string;
  page: PageSettings;
  elements: BuilderElement[];
  selectedTarget: SelectedTarget;
};
```

This keeps export simple because the same state used for preview can be transformed into static HTML.

### Export Strategy

Generate a complete HTML document:

- `<!doctype html>`
- inline `<style>`
- static body markup
- no React dependency
- no build tooling required after download

The browser download can use `Blob`, `URL.createObjectURL`, and a temporary anchor element.

## Implementation Milestones

### Milestone 1: Project Setup

Estimate: 1-2 hours

- Scaffold React + TypeScript app.
- Install and verify `@flodesk/grain`.
- Add base layout and project structure.

### Milestone 2: Template Gallery

Estimate: 1.5 hours

- Define initial template data.
- Build gallery cards.
- Select template and enter builder.

### Milestone 3: Builder Layout

Estimate: 2 hours

- Build header, preview area, and settings sidebar.
- Match the assignment wireframe conceptually without over-indexing on exact visual fidelity.

### Milestone 4: Live Editing

Estimate: 4-5 hours

- Render template from state.
- Implement page selection and element selection.
- Implement page settings.
- Implement text/button element settings.
- Ensure preview updates immediately.

### Milestone 5: HTML Export

Estimate: 2 hours

- Convert builder state to standalone HTML.
- Trigger browser download.
- Manually verify exported file opens directly.

### Milestone 6: Polish, QA, Documentation

Estimate: 3-4 hours

- Improve visual design and empty/selected states.
- Test core user flows.
- Add README.
- Answer optional bonus questions in README.

## Total Estimate

Expected focused implementation time: 14-18 hours.

If the scope needs to be compressed, target a 10-12 hour MVP by limiting element editing to title, paragraph, button, page background, and page width.

## QA Checklist

- User can select at least 2 templates.
- Templates have noticeably different visual styles.
- User can select page-level settings.
- User can select element-level settings.
- Settings panel changes based on selection.
- Preview updates immediately after each setting change.
- Export downloads an HTML file.
- Exported HTML opens directly in a browser.
- Exported HTML preserves the edited content and styling.
- App does not rely on forbidden CSS/UI frameworks.
- README explains setup, decisions, tradeoffs, and time spent.

## Suggested Bonus Answers

### Feature To Cut If Time-Constrained

Cut advanced layout manipulation such as drag-and-drop or broad element support. The core value of the assignment is proving the full path from template selection to live customization to static export. A smaller set of well-supported editable elements is more valuable than a wide but shallow editor.

### Product Improvement Proposal

Add autosave with undo/redo.

This would meaningfully improve user confidence because non-technical users often explore by trial and error. Autosave prevents accidental loss, while undo/redo makes experimentation feel safe.

Implementation outline:

- Store builder state in localStorage with a debounce.
- Keep a bounded history stack for previous states.
- Add undo and redo actions to the header.
- Reset history when switching templates.

## Questions To Confirm With Recruiter

- Is using `@flodesk/grain` as the main component/styling foundation enough, or should specific Grain tokens/patterns be prioritized?
- Should export be a single standalone `.html` file?
- Is implementing 2 templates sufficient, with a third template treated as optional polish?
- Is a meaningful subset of editable elements acceptable?
- Is persistence expected, or should it remain a nice-to-have?
- What submission format is preferred: GitHub repository, ZIP, deployed link, or all of them?
