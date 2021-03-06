const express = require("express");
const massive = require("massive");
const session = require("express-session");
const dotenv = require("dotenv");
const { register } = require("./controller/authController");
const {
  updateAnswers,
  findMatch
} = require("./controller/questionsController");
dotenv.config();

const app = express();

app.use(express.json());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Database Connected :)");
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

app.post("/auth/register", register);
app.put("/api/questions", updateAnswers);
app.get("/api/love", findMatch);

app.listen(5050, () => console.log(`Listening on Port: 5050`));
