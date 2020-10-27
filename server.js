// * The following HTML routes should be created:

//   * GET `/notes` - Should return the `notes.html` file.

//   * GET `*` - Should return the `index.html` file

// * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

var express = require("express");
var fs = require("fs");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = proccess.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/index.html"));
});

// Creating api route
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw (err);
    let notes = JSON.parse(data)
    return res.JSON(notes);
  })
});


// Create New Characters - takes in JSON input
app.post("/api/notes", function (req, res) {
let saved = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
let new = req.body;
let id = (savedNotes.length).toString();
new.id = id;
saved.push(new);

});


//   Must create delete notes portion

app.delete("/api/notes/:id", function(req, res) {
  var id = req.params.id
  fs.readFile("./db/db.json", function(err, data) {
    if (err) throw (err);
    const input =JSON.parse(data)
    const respond = input.filter(item => {
      if(id !== item.id){
        return item
      }
    })
  })
})


app.listen(PORT, function () {
  console.log("App listening on PORT, http://localhost:" + PORT);
});
