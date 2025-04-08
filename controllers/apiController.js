exports.testEndpoint = (req, res) => {
    res.json({ message: 'Secure endpoint reached!', user: req.user });
  };
  