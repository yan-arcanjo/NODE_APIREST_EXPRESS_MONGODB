import authors from "../models/Author.js";

class AuthorsController {
	static getAllAuthors = (req, res) => {
		authors.find((err, authors) => {
			if (!err) {
				res.status(200).json(authors);
			} else {
				res.status(400).send({ message: `${err.message}` });
			}
		});
	};

	static getAuthorById = (req, res) => {
		const id = req.params.id;

		authors.findById(id, (err, books) => {
			if (!err) {
				res.status(200).send(books);
			} else {
				res
					.status(400)
					.send({ message: `${err.message} - author id not found` });
			}
		});
	};

	static addAuthor = (req, res) => {
		let author = new authors(req.body);
		author.save((err) => {
			if (err) {
				res
					.status(500)
					.send({ message: `${err.message} - Failed to add author` });
			} else {
				res.status(201).send(author.toJSON());
			}
		});
	};

	static updateAuthor = (req, res) => {
		const id = req.params.id;

		authors.findByIdAndUpdate(id, { $set: req.body }, (err) => {
			if (!err) {
				res.status(200).send({ message: "Author succesfully updated" });
			} else {
				res.status(500).send({ message: `${err.message}` });
			}
		});
	};

	static deleteAuthor = (req, res) => {
		const id = req.params.id;

		authors.findByIdAndDelete(id, (err) => {
			if (!err) {
				res.send(200).send("author removed");
			} else {
				res.status(500).send({ message: `${err.message}` });
			}
		});
	};
}

export default AuthorsController;
