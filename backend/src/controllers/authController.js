const { User } = require("../models");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
