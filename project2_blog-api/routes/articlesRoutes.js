const router = require("express").Router();
const articlesController = require("../controllers/articlesControllers");
const { isLoggedIn } = require("../middlewares/checkToken");
const {checkNewArticle} = require("../middlewares/validateRequest");

router
	// .use(isLoggedIn)
	.get("/", articlesController.getAllArticles)
	.get("/:id", articlesController.getOneArticle)
	.post("/", isLoggedIn, checkNewArticle, articlesController.createArticle)
	.put("/:id", isLoggedIn, articlesController.updateArticle)
	.delete("/:id", isLoggedIn, articlesController.deleteOneArticle);

module.exports = router;
