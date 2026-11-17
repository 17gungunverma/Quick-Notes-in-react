# Quick Notes (React)
 
A dark-themed notes app where each note is a card with a title and a task list. Rebuilt in React as an AI-assisted development exercise.
 
## Features
 
- Add and delete notes with the "+ Add Note" button
- Rename a note inline
- Add, tick and delete tasks inside a note
- "x of y done" counter on each card
- Empty-state message when there are no notes
- Notes persist in localStorage
## Tech stack
 
React 18, Vite, `useReducer`, plain CSS (CSS variables)
 
## Run locally
 
```bash
npm install
npm run dev
```
 
Open the URL Vite prints (usually http://localhost:5173).
 
## Project structure
 
```
src/
  main.jsx        entry point
  App.jsx         layout and note grid
  NoteCard.jsx    one note card with its task list
  useNotes.js     reducer + localStorage persistence (custom hook)
  styles.css      dark theme
```
 
---
 
## Prompts used during development
 
| # | Stage | Prompt |
|---|-------|--------|
| 1 | Plan | "I'm rebuilding my vanilla JS Quick Notes app in React with Vite. Features: notes with a title and a task list, '+ Add Note' button, dark theme. Propose a component structure and state shape before writing any code." |
| 2 | Scaffold | "Create the Vite + React project files: package.json, vite.config.js, index.html, src/main.jsx. Use React 18, no extra libraries." |
| 3 | State | "Write a custom hook `useNotes` using useReducer with actions add_note, delete_note, rename_note, add_task, toggle_task, delete_task. Persist to localStorage." |
| 4 | UI | "Write a NoteCard component that receives `note` and `dispatch`. It has an editable title, a checkbox task list, and an add-task form. Keep local state only for the new-task input." |
| 5 | Styling | "Write dark-theme CSS using CSS variables. Responsive card grid, visible keyboard focus, completed tasks struck through." |
| 6 | Review | "Review this code for bugs, accessibility problems and unnecessary re-renders. List the issues first; don't rewrite yet." |
| 7 | Fix | "Fix only issues 2 and 4 from your review and show the diff." |
 
## How AI assisted
 
- **Planning:** AI proposed the component split and the state shape. I decided to use one reducer instead of separate `useState` calls per note.
- **Scaffolding:** AI generated the Vite config, entry files and CSS variables, which saved setup time.
- **Core logic:** AI drafted the reducer and the `NoteCard` component. I read every action to confirm it only changes the intended note.
- **Review:** I asked AI to critique its own output for bugs and accessibility before accepting it.
- **Debugging:** I pasted console errors and the failing code back into AI along with the expected behaviour.
AI sped up the repetitive work. I made the decisions on structure, naming and behaviour, and tested everything in the browser.
 
## Manual improvements, corrections and refactoring
 
1. **Moved state out of `App`.** The first draft kept the reducer and localStorage code inside `App.jsx`. I moved it into `useNotes.js` so components only render.
2. **Safe loading from localStorage.** The draft called `JSON.parse(localStorage.getItem(...))` directly, which crashes on corrupted data. I wrapped it in try/catch and used a lazy initialiser so it runs only once.
3. **Blocked empty tasks.** Submitting an empty form added a blank task. I trim the input and return early if it is empty.
4. **Stable IDs instead of array indexes.** Using the index as the React `key` and task identifier broke checkbox state after deleting a task. I switched to `crypto.randomUUID()`.
5. **Accessibility.** I added `aria-label`s to the title input, delete buttons and task input, and a visible `:focus-visible` outline.
6. **Empty state.** I added a message for when no notes exist so a new user knows what to do.
7. **Naming consistency.** I renamed the generic `handleClick` to `submit` in the task form and kept "Add" wording consistent across note and task actions.
 
