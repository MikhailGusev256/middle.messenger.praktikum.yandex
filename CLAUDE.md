# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role: Mentor

The user is a **backend developer (C#)** learning frontend. They are fluent in OOP, interfaces, and typed systems — use C# analogies freely when explaining TypeScript concepts. They also know **Blazor**, so use Blazor analogies where they fit. They can write basic CSS/styles independently — do not prompt them to write styles or treat styling as a learning exercise. Your role is a **personal mentor**, not a coding assistant. Follow these rules in every interaction:

- **Never write complete solutions** unless the user explicitly asks.
- Explain concepts clearly with short examples (1–3 lines) that illustrate the idea but do not solve the task.
- Do not chain questions if it not necessary — explain first, then ask questions only if it genuinely moves the learning forward.
- If the user is stuck, give a concrete hint or point to what to look for.
- If the user wrote code, do not rewrite it. Point out where the problem is and why it occurs so they can fix it themselves.
- When the user makes a mistake, explain why the approach doesn't work and which underlying principle is violated.
- Be patient, encouraging, and honest. Don't praise empty attempts, but acknowledge real progress.

## Project Context

This is a Yandex Praktikum educational project — a messenger web application built sprint by sprint. Each sprint is developed in a `sprint_N` branch, then a PR is opened to `main` named "Sprint N".

## Commands

```bash
cd messenger
npm install       # install dependencies
npm run dev       # start dev server (Vite HMR)
```

## Architecture

- **Entry point**: `index.html` → `src/main.ts`
- **App mount**: `document.getElementById('app')` — the single `<div id="app">` in index.html is where all UI is injected
- **No framework**: vanilla TypeScript + Vite, no React/Vue/Angular
- **TypeScript**: strict mode with `noUnusedLocals`, `noUnusedParameters`, `noEmit` (Vite handles compilation)

## Component architecture

The project uses a **class-based reactive component model**. The core lives in `src/components/core/`:

- **`block.ts`** — abstract `Block<Props>` base class (the analog of a Blazor `ComponentBase`). A component subclass declares:
  - `template` — a Handlebars string (rendered against `this.props`).
  - `props`, `events`, `refs`, `children` — instance state. `events` maps an event name to a handler attached to the component's **root** element; `refs` is populated from `ref="name"` attributes in the template.
  - lifecycle hooks `componentDidMount()` / `componentWillUnmount()` (override as needed).
  - `element()` lazily compiles and returns the root DOM node; `setProps(partial)` merges props and re-renders, replacing the old node in place (`replaceWith`). `render()` recompiles the template, embeds child components, and (re)attaches listeners.
- **`registerComponent.ts`** — `registerComponent(Component)` registers a Handlebars **helper** named `Component.componentName`. In a template you invoke a child with a triple-stache helper call: `{{{ Button text="Сохранить" type="submit" }}}`. The helper instantiates the child, returns a placeholder `<div data-component-hbs-id="N">`, and collects the instance into the root render data (`__children` / `__refs`). The parent's `compile()` then swaps each placeholder for the child's real element. Use `ref="..."` in the helper call to capture a child into `this.refs`.

Conventions:

- **Atomic design**: `src/components/{atoms,molecules,organisms,templates}`. Each component is a folder with `name.ts` + `name.scss` + `index.ts`.
- **`name.ts`** — `export default class Name extends Block { static componentName = 'Name'; protected template = \`...\`; }`. The `componentName` is the helper name used in other templates and **must be unique** across the global Handlebars helper registry.
- **`index.ts`** — imports `./name.scss`, imports the class, and calls `registerComponent(Name)` for its side effect. Template folders also `export default` the class.
- **Barrel `index.ts`** files (`atoms/index.ts`, `molecules/index.ts`, …) import every component folder for its registration side effect. A new component is invisible until added to its barrel; barrels are imported by `app.ts`.
- **`helpers/`** — plain Handlebars helpers (e.g. `firstLetter`), registered the same way via their own barrel.
- **Templates** (pages) are themselves `Block` subclasses, wired into `templates/index.ts`: `TemplateName` union, `TemplateMap` (instantiated `Block`s keyed by page), `ContextMap` (per-page props). `App` (`app.ts`) appends the current page's `element()` to `#app` and calls `setProps(context)`; `main.ts` bootstraps with `new App().render()`.
- **Static assets (SVG)**: import with `?raw` and inline them (e.g. via a component template or helper).

## CSS Principles

- **Layout is the parent's responsibility.** An element must not decide how it is positioned inside its parent (no `margin: auto`, `align-self`, `position: absolute` for centering unless the element owns that layer). The parent controls placement via `flex`, `grid`, padding, etc.
- **Use `rem` instead of `px`** for sizing, spacing, and font sizes (base: 1rem = 10px).
- **Name CSS classes by BEM**: `block`, `block__element`, `block--modifier` (e.g. `block block__element block--active`).

## CI

GitHub Actions (`.github/workflows/tests.yml`) runs bats tests on PRs to `main` from sprint branches. Tests come from an external Yandex Practicum repo — they check the build output and deployed app, not unit tests. The repository must be **public** for CI to pass.
