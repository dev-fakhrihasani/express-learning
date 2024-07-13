import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;

const users = [
  { id: 1, username: "abdillah", displayName: "Abdillah" },
  { id: 2, username: "fakhri", displayName: "Fakhri" },
  { id: 3, username: "hasani", displayName: "Hasani" }
];

app.get('/', (req, res) => {
  res.status(201).send({ message: 'Hi I am Sani!' });
});

app.get('/api/users', (req, res) => {
  res.status(201).send(users);
});

app.get('/api/users/:id', (req, res) => {
  const parsedId = parseInt(req.params.id)
  if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad Request. Invalid id" })

  const findUser = users.find((user) => user.id === parsedId)
  if (!findUser) return res.sendStatus(404)
  return res.send(findUser)

})

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