import books from "../models/Book.js";

class BookController {
	static getAllBooks = (req, res) => {
		books
			.find()
			.populate("author")
			.exec((err, books) => {
				res.status(200).json(books);
			});
	};

	static getBookById = (req, res) => {
		const id = req.params.id;

		books
			.findById(id)
			.populate("author", "name")
			.exec((err, books) => {
				if (!err) {
					res.status(200).send(books);
				} else {
					res
						.status(400)
						.send({ message: `${err.message} - book id not found` });
				}
			});
	};

	static addBook = (req, res) => {
		let book = new books(req.body);
		book.save((err) => {
			if (err) {
				res
					.status(500)
					.send({ message: `${err.message} - Failed to add book` });
			} else {
				res.status(201).send(book.toJSON());
			}
		});
	};

	static updateBook = (req, res) => {
		const id = req.params.id;

		books.findByIdAndUpdate(id, { $set: req.body }, (err) => {
			if (!err) {
				res.status(200).send({ message: "Book succesfully updated" });
			} else {
				res.status(500).send({ message: `${err.message}` });
			}
		});
	};

	static deleteBook = (req, res) => {
		const id = req.params.id;

		books.findByIdAndDelete(id, (err) => {
			if (!err) {
				res.status(200).send({ message: "Book succesfully removed" });
			} else {
				res.status(500).send({ message: `${err.message}` });
			}
		});
	};

	static getBookByEditor = (req, res) => {
		const editor = req.query.editor;

		books.find(
			{
				editor: editor,
			},
			{},
			(err, books) => {
				res.status(200).send(books);
			}
		);
	};
}

export default BookController;
