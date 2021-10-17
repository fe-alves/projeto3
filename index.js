require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let message = "";

const Filme = require("./models/filme");

app.get("/", (req, res) => {
  setTimeout(() => {message = "";}, 1000);
  res.render("index", {message});
});

app.get("/catalogo", async (req, res) => {
  setTimeout(() => {message = "";}, 1000)
  const filmes = await Filme.findAll();

  res.render("catalogo", {
    filmes, message
  });
});

app.get("/detalhes/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id)
  res.render("detalhes", {
    filme,
  });
});

app.get("/cadastro", (req, res) => {
  res.render("../views/cadastro");
}); 

app.post("/cadastro", async (req, res) => {
  const { nome_filme, genero_filme, imagem_filme, classificacao_filme, duracao_filme, ano_filme, diretor_filme } = req.body;

  if (!nome_filme) {
    res.render("cadastro", {
      message: "Nome é obrigatório",
    });
  }

  else if (!imagem_filme) {
    res.render("cadastro", {
      message: "Imagem é obrigatório",
    });
  }

  else {
    try {
      const filme = await Filme.create({
        nome_filme,
        genero_filme,
        imagem_filme,
        classificacao_filme,
        duracao_filme,
        ano_filme,
        diretor_filme,
      });
    } catch (err) {
      console.log(err);

      res.render("cadastro", {
        message: "Ocorreu um erro ao cadastrar o Filme!",
      });
    }
  }
  message = "Filme/Série cadastrado(a)!"
  res.redirect("/")
});/*


  const filme = await Filme.create({
    nome_filme,
    genero_filme,
    imagem_filme,
    classificacao_filme,
    duracao_filme,
    ano_filme,
    diretor_filme,
  });

  
  res.render("cadastro", {
    filme,
  });
  message = "Filme/Série cadastrado(a)!"
  res.redirect("/");
});*/

app.get("/editar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  res.render("editar", {
    filme,
  });
});

app.post("/editar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  const { nome_filme, genero_filme, imagem_filme, classificacao_filme, duracao_filme, ano_filme, diretor_filme } = req.body;

  filme.nome_filme = nome_filme;
  filme.genero_filme = genero_filme;
  filme.imagem_filme = imagem_filme;
  filme.classificacao_filme = classificacao_filme;
  filme.duracao_filme = duracao_filme;
  filme.ano_filme = ano_filme;
  filme.diretor_filme = diretor_filme;

  const filmeEditado = await filme.save();

  res.render("editar", {
    filme: filmeEditado,
  });
    message = "Filme/Série editado(a)!"
  res.redirect("/catalogo");
})

app.get("/deletar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  res.render("deletar", {
    filme,
  });
});

app.post("/deletar/:id", async (req, res) => {
  setTimeout(() => {message = "";}, 1000);
  const filme = await Filme.findByPk(req.params.id);

  await filme.destroy();

  res.render("deletar", {
    message: `Deletado com sucesso!`,
  });
  res.redirect("/catalogo");

});

/*
app.get("/autores", (req, res) => {
  res.render("autores");
});   
*/

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));