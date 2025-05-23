exports.paginaInicial = (req, res) => {
  res.render("index");
};
exports.trataPost = (req, res) => {
  console.log(req.body);
  res.send(`Foi enviado com sucesso, ${req.body}`);
};
