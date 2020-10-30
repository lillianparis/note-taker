var express = require("express");
var fs = require("fs");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw (err);
    let notes = JSON.parse(data)
    return res.json(notes);
  })
});


// Create New Characters - takes in JSON input
app.post("/api/notes", function (req, res) {
  // Get existing notes
  let saved = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  // Prepare new note object
  let newSaved = req.body;
  let id = (saved.length).toString();
  newSaved.id = id;
  // console.log(newSaved);
  // console.log(saved);
  // Push new note to existing notes
  saved.push(newSaved);
  // Write all notes back to DB
  fs.writeFileSync("./db/db.json", JSON.stringify(saved));
  // 204 = NO CONTENT!!
  return res.sendStatus(204);
});

// Deletes notes
app.delete("/api/notes/:id", function (req, res) {
  var id = req.params.id
  console.log(id);
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw (err);
    const userInput = JSON.parse(data)
    console.log("userInput:", userInput)
    const respond = userInput.filter(item => {
      if (id !== item.id) {
        return item
      }
      
    })
    console.log("respond:", respond);

    fs.writeFileSync("./db/db.json", JSON.stringify(respond));

    return res.sendStatus(204);
    // Deletes notes from DB
      // Logic to read the json file and then display on page
    })
  })

  // app.get is required from instruction
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  app.listen(PORT, function () {
    console.log("App listening on PORT, http://localhost:" + PORT);
  });
