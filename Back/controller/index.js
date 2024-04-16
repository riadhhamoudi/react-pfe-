const { getOneUser } = require('../model/index.js');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getOneUser(email);
    if (!user || user.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userRow = user[0];
    const passwordMatch = await bcrypt.compare(password, userRow.password);
    if (passwordMatch) {
      res.status(200).send("You are logged in");
    } else {
      res.status(400).send("Wrong password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};



module.exports = { loginUser };
