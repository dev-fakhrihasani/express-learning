import express from "express";

const app = express();

// Set middleware in order to allow JSON
app.use(express.json())

// Create middleware for resolve index by user id
const resolveIndexByUserId = (req, res, next) => {
  // Destructuring request object
  const { params: { id } } = req

  // Converts id from string to integer
  const parsedId = parseInt(id);

  // Check if the id is not number then will return bad request
  if (isNaN(parsedId)) return res.sendStatus(400);

  // Find user index that has an id that match with the parseId
  const findUserIndex = users.findIndex((user) => user.id === parsedId);

  // Check if there is no user id equal to parsedId
  if (findUserIndex === -1) return res.sendStatus(404);

  // Assign findUserIndex to request property called findUserIndex
  req.findUserIndex = findUserIndex

  next()
};

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

app.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = users[findUserIndex];
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

// PUT method
app.put('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req
  users[findUserIndex] = { id: users[findUserIndex].id, ...body }
  return res.status(200).send('Data has been changed')

});

// PATCH method
app.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req
  users[findUserIndex] = { ...users[findUserIndex], ...body }
  return res.status(200).send('Data has been changed')
});

// DELETE method
app.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  users.splice(findUserIndex, 1);
  return res.status(200).send('Data has been deleted')
});


app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});