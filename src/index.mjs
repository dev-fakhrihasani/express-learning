import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.status(201).send({ message: 'Hi I am Sani!' });
});

app.get('/api/users', (req, res) => {
  res.status(201).send([{
    id: 1,
    username: "Fakhri",
    displayName: "Fakh"
  }]);
});

app.get('/api/products', (req, res) => {
  res.status(201).send([{
    id: 2,
    name: "Jamu",
    price: 5000
  }])
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});