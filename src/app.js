import express from "express";
import db from "./config/dbConnect.js";

db.on("error", console.log.bind(console, "Connection Error"));
db.once("open", () => {
	console.log("db connection ok");
});

const app = express();

app.use(express.json());

const books = [
	{
		id: 1,
		title: "Lord of the rings",
	},
	{
		id: 2,
		title: "The Hobbit",
	},
];

app.get("/", (req, res) => {
	res.status(200).send("Curso de Node");
});

app.get("/books", (req, res) => {
	res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
	let index = searchBook(req.params.id);
	res.json(books[index]);
});

app.post("/books", (req, res) => {
	books.push(req.body);
	res.status(201).send("book registered");
});

app.put("/books/:id", (req, res) => {
	let index = searchBook(req.params.id);
	books[index].title = req.body.title;
	res.json(books);
});

app.delete("/books/:id", (req, res) => {
	let { id } = req.params;
	let index = searchBook(id);
	books.splice(index, 1);
	res.send(`Book ${id} success removed`);
});

function searchBook(id) {
	return books.findIndex((book) => book.id == id);
}

export default app;

// b9VyeNZ66vhs9YPZ
