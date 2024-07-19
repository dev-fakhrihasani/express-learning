import { request, Router } from "express";
import { users } from "../utils/constants.mjs";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const router = Router();

router.get('/api/users', (req, res) => {
  console.log(req.session.id)
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log(sessionData)
  })
  console.log(req.query);
  const { query: { filter, value } } = req;
  if (filter && value) return res.send(
    users.filter((user) => user[filter].includes(value))
  );
  return res.status(200).send(users);
});

router.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = users[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

router.post('/api/users', checkSchema(createUserValidationSchema), (req, res) => {
  const result = validationResult(req);
  console.log(result.errors.map(error => error.msg));
  if (!result.isEmpty()) return res.status(400).send({ error: result.errors.map(error => error.msg) })
  const data = matchedData(req);
  const newUser = { id: users[users.length - 1].id + 1, ...data };
  // id: user[2].id = id: 3
  // id: (user[2].id) + 1 = id: (3) + 1
  users.push(newUser);
  return res.status(201).send(newUser);
});

router.put('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  users[findUserIndex] = { id: users[findUserIndex].id, ...body };
  return res.status(200).send('Data has been changed');
});

router.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  users[findUserIndex] = { ...users[findUserIndex], ...body };
  return res.status(200).send('Data has been changed');
});

router.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  users.splice(findUserIndex, 1);
  return res.status(200).send('Data has been deleted');
});

export default router;