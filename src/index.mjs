import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 4000;

// Set middleware in order to allow JSON
app.use(express.json());

app.use(cookieParser('cookies1'))

app.use(
  session({
    secret: "sani ganteng 123",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60
    }
  })
);

// Import all router from src/index
app.use(routes);

// Get root address
app.get('/', (req, res) => {
  console.log(req.session)
  console.log(req.session.id)
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 10000, signed: true });
  res.status(200).send("<h1> Hi! Welcome to my website </h1>");
});

// Run the app
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});