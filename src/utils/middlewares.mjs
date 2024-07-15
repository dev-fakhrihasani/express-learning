import { users } from "./constants.mjs";

// Create middleware for resolve index by user id
export const resolveIndexByUserId = (req, res, next) => {
  // Destructuring request object
  const { params: { id } } = req;

  // Converts id from string to integer
  const parsedId = parseInt(id);

  // Check if the id is not number then will return bad request
  if (isNaN(parsedId)) return res.sendStatus(400);

  // Find user index that has an id that match with the parseId
  const findUserIndex = users.findIndex((user) => user.id === parsedId);

  // Check if there is no user id equal to parsedId
  if (findUserIndex === -1) return res.sendStatus(404);

  // Assign findUserIndex to request property called findUserIndex
  req.findUserIndex = findUserIndex;

  next();
};