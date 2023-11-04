const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const { json } = require('body-parser');

const app = express();

var PORT = process.env.PORT || 3001;

app.use (express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));



app.listen(PORT, () =>
  console.info(`App listening at PORT ${PORT}`)
);