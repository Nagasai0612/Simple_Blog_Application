import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
let postss = [];
let postId = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/createBlog", (req, res) => {
  res.render("create-blog.ejs");
});

app.post("/createBlog", (req, res) => {
  const titlee = req.body["title"];
  const descriptionn = req.body["description"];
  postss.push({
    id: postId++,
    title: titlee,
    description: descriptionn,
  });


  res.redirect("/");
});
app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts: postss,
  });
});
app.post("/delete/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  postss = postss.filter((post) => post.id !== blogId);
  res.redirect("/");
});
app.get("/edit/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const editableBlog = postss.find((post) => post.id === blogId);

  if (editableBlog) {
    res.render("update-blog.ejs", {
      titles: editableBlog.title,
      descriptions: editableBlog.description,
      id: editableBlog.id,
    });
  } else {
    res.status(404).send("Post not found");
  }
  console.log(editableBlog);
});
app.post("/edit/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const IndexOfEdit = postss.findIndex((post) => post.id === blogId);

  if (IndexOfEdit !== -1) {
    postss[IndexOfEdit].title = req.body["title"];
    postss[IndexOfEdit].description = req.body["description"];
    res.redirect("/");
  } else {
    res.status(404).send("post not found");
  }
});


app.listen(port, () => {
  console.log(`Listening to server on ${port}`);
});
