const express = require("express");
const logger = require("./LoggerMiddleware")
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
app.use(logger);

let notes = [
  {
    id: 1,
    content: "Me tengo que suscribir a @midudev en YouTube y Twitch",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Tengo que estudiar las clases del FullStack Bootcamp",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "Repasar los retos de JS de midudev",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1> Hello World </h1>");
});
app.get("/api/notes", (request, response) => {
  response.json(notes);
});
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.send(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes/", (request, response) => {
  const note = request.body

  if (!note || !note.content ) {
    response.status(400).json({ 
      error: "Note is missing"
    });
  }   

  const ids = notes.map((note) => note.id) 
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
     error:'Not Found' 
    })  
})
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
