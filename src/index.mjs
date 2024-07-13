import express from "express";

const app = express();

// Set middleware in order to allow JSON
app.use(express.json())

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
  console.log(req.query)
  const { query: { filter, value } } = req;
  if (filter && value) return res.send(
    users.filter((user) => user[filter].includes(value))
  );
  return res.status(201).send(users);

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

// POST method
app.post('/api/users', (req, res) => {
  const { body } = req;
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  // id: user[2].id = id: 3
  // id: (user[2].id) + 1 = id: (3) + 1
  users.push(newUser)
  return res.status(201).send(newUser);
});

//PUT method
app.put('/api/users/:id', (req, res) => {
  const { body, params: { id } } = req
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = users.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  users[findUserIndex] = { id: parsedId, ...body }
  return res.status(200).send('Data has been changed')

});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});