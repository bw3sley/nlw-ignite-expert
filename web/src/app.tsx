import { ChangeEvent, useState } from "react";

import Logo from "./assets/nlw-expert-logo.svg";

import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string,
  date: Date,
  content: string
}

export function App() {
  const [search, setSearch] = useState("");

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("@nlw-expert:notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content
    }

    const notesArray = [newNote, ...notes]; 

    setNotes(notesArray);

    localStorage.setItem("@nlw-expert:notes", JSON.stringify(notesArray));
  }

  function onNoteDeleted(id: string) {
    const notesWithoutDeletedOne = notes.filter(note => {
      return note.id !== id;
    }); 

    setNotes(notesWithoutDeletedOne);

    localStorage.setItem("@nlw-expert:notes", JSON.stringify(notesWithoutDeletedOne));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes = search !== "" ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes;

  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={Logo} alt="NLW Expert" />

      <form action="" className="w-full">
        <input 
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500" 
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700"></div>

      <section className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        
        {filteredNotes.map(note => ( 
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} /> 
        ))}
      </section>
    </main>
  )
}