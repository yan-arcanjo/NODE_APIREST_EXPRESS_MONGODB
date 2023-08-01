import express from "express";
import AuthorsController from "../controllers/authorsController.js";

const router = express.Router();

router
	.get("/authors", AuthorsController.getAllAuthors)
	.get("/authors/:id", AuthorsController.getAuthorById)
	.post("/authors", AuthorsController.addAuthor)
	.put("/authors/:id", AuthorsController.updateAuthor)
	.delete("/authors/:id", AuthorsController.deleteAuthor);

export default router;
