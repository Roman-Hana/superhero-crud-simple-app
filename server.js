const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article")
const articlesRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://romanhana:141414@cluster0.1oqal.mongodb.net/test');
}

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// const articles = [
//   {
//     nickname: "Superman",
//     real_name: "Clark Kent",
//     origin_description:
//       "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction...",
//     superpowers: "solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...",
//     catch_phrase: "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
//     images: ["https://upload.wikimedia.org/wikipedia/ru/thumb/6/68/Superman01.jpg/227px-Superman01.jpg"],
//   },
// ];


app.get("/", async (req, res) => {
  const articles = await Article.find()

  res.render("articles/index", { article: articles });
});

app.use("/articles", articlesRouter);



app.listen(5000);
