const notFound = (req, res) =>
  res
    .status(404)
    .send(
      `<h1>404</h1><h2>The route ${req.url} does not exist.</h2><a href="/">Go back home</a>`
    )
module.exports = notFound
