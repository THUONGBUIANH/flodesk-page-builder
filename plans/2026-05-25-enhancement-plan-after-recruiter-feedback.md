# 2026-05-25 Enhancement Plan After Recruiter Feedback

## Context

Recruiter/frontend team feedback confirmed:

- Grain should be used as the primary design system.
- If a Grain component is unavailable, custom UI can be built on top of Grain foundational components and tokens.
- Export should be a single standalone `.html` file that opens directly in a browser.
- The proposed editing subset is acceptable.
- Autosave is a nice UX improvement.
- Submission format is flexible, but the codebase must be accessible.
- A deployed link is a plus for quick review.

## Enhancement Goals

Improve the current implementation in the areas most aligned with the feedback:

1. Make autosave available as a lightweight UX improvement.
2. Make Grain usage more explicit and defensible.
3. Clarify submission expectations in the README.

## Planned Enhancements

### 1. Add Autosave

Priority: High

Scope:

- Save the current builder state to `localStorage`.
- Restore the saved draft when the app opens.
- Show a small autosave status in the header.
- Provide a clear way to discard the saved draft and return to template selection.

Acceptance:

- User can edit a template, refresh the browser, and continue from the same state.
- User can intentionally start over.
- Autosave does not affect exported HTML.

Out of scope:

- Cloud persistence.
- User accounts.
- Multi-page drafts.
- Full undo/redo.

### 2. Strengthen Grain Usage

Priority: High

Scope:

- Keep `GrainProvider` as the app-level provider.
- Use Grain foundational components where practical, especially for layout/text/buttons.
- Keep assignment-specific controls custom only when needed.
- Style custom controls using Grain/global design tokens where possible.
- Update README to explain this approach clearly.

Acceptance:

- The app visibly and technically uses Grain as the design-system foundation.
- Custom components are justified as assignment-specific editor controls.
- No forbidden UI/CSS frameworks are introduced.

### 3. README Submission Notes

Priority: Medium

Scope:

- Add a short "Submission" section.
- Explain how to run locally.
- Explain what to include when submitting:
  - accessible code repository or ZIP,
  - optional deployed link,
  - actual time spent,
  - tradeoffs.

Acceptance:

- Reviewer can understand how to run and evaluate the project quickly.
- The README does not imply that a deployed link replaces source-code access.

## Deployment Clarification

A deployed link is only for quick product review. It lets the reviewer open the app immediately without cloning, installing dependencies, or running commands.

It does not replace sharing the codebase.

Recommended submission:

- Share the codebase through GitHub/GitLab/ZIP.
- Optionally include a deployed link from Vercel, Netlify, or a similar static host.
- Include README instructions and actual time spent.

## Suggested Implementation Order

1. Add localStorage autosave and restore flow.
2. Add discard/start-over behavior.
3. Add autosave status UI.
4. Refactor selected layout/text/button surfaces to use Grain components if the API is straightforward.
5. Update README with Grain approach and submission notes.
6. Run `corepack pnpm build`.
7. Manually verify refresh/restore/export.

## Estimate

Expected additional effort: 2.5-4 focused hours.

Breakdown:

- Autosave and restore: 1-1.5h.
- Start-over/discard flow: 0.5h.
- Autosave status polish: 0.5h.
- Grain usage review/refactor: 0.5-1h.
- README updates and verification: 0.5h.

## Decision

Proceed with autosave and Grain alignment before final submission. Do not add drag-and-drop, rich text editing, upload flows, or backend features unless the assignment scope changes.
