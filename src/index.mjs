import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;

// Set middleware in order to allow JSON
app.use(express.json());

app.use(cookieParser('cookies1'))

// Import all router from src/index
app.use(routes);

// Get root address
app.get('/', (req, res) => {
  res.cookie("hello", "world", { maxAge: 10000, signed: true });
  res.status(200).send("<h1> Hi! Welcome to my website </h1>");
});

// Run the app
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});