const express = require("express");
const mysql = require("mysql2");
var cors = require('cors')
const app = express();
const PORT = 3306;
app.use(express.json());
app.use(cors())

const connection = mysql.createConnection({
  host: "bxzwt7byj6351g4grvgn-mysql.services.clever-cloud.com",
  user: "uyhqh9ku7gwgzdyp",
  password: "If5UqTfQSfGzIP9NQTN5",
  database: "bxzwt7byj6351g4grvgn",
});

app.get("/student",(req, res) => {
  connection.query("select * from users", function (err, result, fields) {
    console.log(result);
    res.send(result);
  });
});
app.get("/student/:id", (req, res) => {
  const elem = req.params;
  let found = false; // Flag to track if a matching record is found

  connection.query("select * from users", function (err, result, fields) {
    for (let i = 0; i < result.length; i++) {
      if (elem.id == result[i].id) {
        found = true; // Set the flag to true if a match is found
        res.send(result[i]); // Send the response for the matching record
        break; // Exit the loop when a match is found
      }
    }

    // If no match is found, send an appropriate response
    if (!found) {
      res.status(404).send("User not found!"); // Use a 404 status code for not found
    }
  });
});

app.delete("/student/:id", (req, res) => {
  const idToDelete = req.params.id;

  connection.query(
    `DELETE FROM users WHERE id = ?`,
    [idToDelete],
    function (err, result, fields) {
    }
  );
  connection.query("select * from users", function (err, result, fields) {
    console.log(result);
    res.send(result);
  });
});


app.post("/student/", (req, res) => {
  let obj = req.body;
  connection.query(
    `INSERT INTO users (id, ad, soyad, parol, adress)
    VALUES ("${obj.id}", "${obj.ad}", "${obj.soyad}", "${obj.parol}",`,
    function (err, result, fields) {
    }
  );
  connection.query("select * from users", function (err, result, fields) {
    console.log(result);
    res.send(result);
  });
});
app.listen(process.env.PORT || 3000);