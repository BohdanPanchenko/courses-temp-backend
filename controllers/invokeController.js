const invokeServer = async (req, res) => {
  res.send("Server has been invoked!");
};

module.exports = {
  invokeServer,
};
