const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');
const app = express();
const { response } = require('express');


app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
    const { title, url , techs } = request.body
    const { id } = request.params

    const repositoryIndex = repositories.findIndex(repo => repo.id == id);

    const repository = {
      title, 
      url,
      techs,
    }

    repositories[repositoryIndex] = repository;
    return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

app.listen(3334, () => {
  console.log('backend funcionando')
});
module.exports = app;
