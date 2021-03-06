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
    likes: 0,
  };

  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body
  const { id } = request.params
  const repositoryIndex = repositories.findIndex(repo => repo.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).send();
  }

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories[repositoryIndex] = repository;
  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repo => repo.id == id);
  if (repositoryIndex < 0) {
    return response.status(400).send();
  }

  repositories.splice(repositoryIndex, 1)
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const repository = repositories.find(repo => repo.id == id);

  if (!repository) {
    return response.status(400).send();
  }

  repository.likes += 1;
  return response.json(repository);

});

module.exports = app;
