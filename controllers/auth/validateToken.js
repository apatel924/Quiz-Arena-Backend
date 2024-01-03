const validateToken = async (req, res) => {
  try {
    res.json({ userId: req.userId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Token is not valid');
  }
};

module.exports = validateToken;
