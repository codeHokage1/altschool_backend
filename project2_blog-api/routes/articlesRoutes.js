const router = require("express").Router();
const articlesController = require("../controllers/articlesControllers");
const { isLoggedIn, isAuthor } = require("../middlewares/checkToken");
const { checkNewArticle } = require("../middlewares/validateRequest");

router
	// .get("/my", (req, res) => res.send("My Articles"))
	.get("/", articlesController.getAllArticles)
	.get("/my-articles", isLoggedIn, articlesController.getMyArticles)
	.get("/:id", articlesController.getOneArticle)
	.post("/", isLoggedIn, checkNewArticle, articlesController.createArticle)
	.put("/:id", isLoggedIn, isAuthor, articlesController.updateArticle)
	.delete("/:id", isLoggedIn, isAuthor, articlesController.deleteOneArticle);

module.exports = router;
