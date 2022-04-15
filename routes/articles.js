const express = require("express");
const req = require("express/lib/request");
const Article = require("./../models/article");
const router = express.Router();

router.get("/new", function (req, res) {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:id", async function (req, res) {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

router.get("/:id", async function (req, res) {
  const article = await Article.findById(req.params.id);
  if (article === null) res.redirect("/");
  res.render("articles/details", { article: article });
});

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticle('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticle('edit'))

router.delete("/:id", async function (req, res) {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticle(path) {
  return async (req, res) => {
    let article = req.article
    article.nickname = req.body.nickname
    article.real_name = req.body.real_name
    article.origin_description = req.body.origin_description
    article.superpowers = req.body.superpowers
    article.catch_phrase = req.body.catch_phrase
    article.image = req.body.image
    try {
      article = await article.save();
      res.redirect(`/articles/${article.id}`);
    } catch (error) {
      res.render(`/articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
