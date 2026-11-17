import { useEffect, useReducer } from "react";

const KEY = "quick-notes-v1";
const uid = () => crypto.randomUUID();

function reducer(notes, action) {
  switch (action.type) {
    case "add_note":
      return [{ id: uid(), title: "Untitled note", tasks: [] }, ...notes];
    case "delete_note":
      return notes.filter((n) => n.id !== action.id);
    case "rename_note":
      return notes.map((n) => (n.id === action.id ? { ...n, title: action.title } : n));
    case "add_task":
      return notes.map((n) =>
        n.id === action.id
          ? { ...n, tasks: [...n.tasks, { id: uid(), text: action.text, done: false }] }
          : n
      );
    case "toggle_task":
      return notes.map((n) =>
        n.id === action.id
          ? { ...n, tasks: n.tasks.map((t) => (t.id === action.taskId ? { ...t, done: !t.done } : t)) }
          : n
      );
    case "delete_task":
      return notes.map((n) =>
        n.id === action.id ? { ...n, tasks: n.tasks.filter((t) => t.id !== action.taskId) } : n
      );
    default:
      return notes;
  }
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export function useNotes() {
  const [notes, dispatch] = useReducer(reducer, [], load);
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(notes));
  }, [notes]);
  return [notes, dispatch];
}
