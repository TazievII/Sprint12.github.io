const usersBase = require('../data/users.json');

function users(res) {
  res.send(usersBase);
}


function searchUser(req, res) {
  usersBase.find((element) => {
    if (element._id === req.params.id) {
      const current = element;
      return res.status(200).send(current);
    } return undefined;
  });
}


module.exports = { users, searchUser };
