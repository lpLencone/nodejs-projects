const notFound = (req, res) =>
  res
    .status(404)
    .send('<h1>404</h1><h2>Route does not exist</h2><a href="/">return</a>')

module.exports = notFound
