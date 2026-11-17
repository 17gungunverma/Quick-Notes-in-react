import NoteCard from "./NoteCard.jsx";
import { useNotes } from "./useNotes.js";

export default function App() {
  const [notes, dispatch] = useNotes();

  return (
    <main className="app">
      <header className="top">
        <h1>Quick Notes</h1>
        <button className="primary" onClick={() => dispatch({ type: "add_note" })}>
          + Add Note
        </button>
      </header>

      {notes.length === 0 ? (
        <p className="empty">No notes yet. Select “+ Add Note” to start your first list.</p>
      ) : (
        <section className="grid">
          {notes.map((n) => (
            <NoteCard key={n.id} note={n} dispatch={dispatch} />
          ))}
        </section>
      )}
    </main>
  );
}
