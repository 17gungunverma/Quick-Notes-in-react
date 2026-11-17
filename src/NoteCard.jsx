import { useState } from "react";

export default function NoteCard({ note, dispatch }) {
  const [text, setText] = useState("");
  const done = note.tasks.filter((t) => t.done).length;

  function submit(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    dispatch({ type: "add_task", id: note.id, text: value });
    setText("");
  }

  return (
    <article className="card">
      <header className="card-head">
        <input
          className="title"
          value={note.title}
          aria-label="Note title"
          onChange={(e) => dispatch({ type: "rename_note", id: note.id, title: e.target.value })}
        />
        <button className="icon" aria-label="Delete note" onClick={() => dispatch({ type: "delete_note", id: note.id })}>
          ×
        </button>
      </header>

      <ul className="tasks">
        {note.tasks.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch({ type: "toggle_task", id: note.id, taskId: t.id })}
              />
              <span>{t.text}</span>
            </label>
            <button className="icon small" aria-label="Delete task" onClick={() => dispatch({ type: "delete_task", id: note.id, taskId: t.id })}>
              ×
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="add-task">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a task" aria-label="New task" />
        <button type="submit">Add task</button>
      </form>
      {note.tasks.length > 0 && <p className="count">{done} of {note.tasks.length} done</p>}
    </article>
  );
}
