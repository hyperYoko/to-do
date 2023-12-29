import express from "express";
import cors from "cors";
import mysql from "mysql";
   
const app = express();
app.use(cors());
app.use(express.json());
 
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "todom",
});
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
 
app.post("/create", (req, res) => {
    const name = req.body.name;
     
    db.query(
      "INSERT INTO users (name) VALUES (?)",
      [name],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("You have registered successfully!");
        }
      }
    );
}); 
 
app.get("/userdetails/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
 
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM users WHERE id = ? ";
 
  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
 
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE users SET `name`= ? WHERE id = ?";
 
  const values = [
    req.body.name,
  ];
 
  db.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

 
app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});
