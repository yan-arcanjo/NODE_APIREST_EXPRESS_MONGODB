import books from "../models/Book.js";

class BookController {
  static getAllBooks = async(req, res) => {
    try{
      const booksResult = await books.find().populate("author").exec();
      res.status(200).json(booksResult);
    }catch(error){
      res.status(500).send({message: `Error on server: ${error}`});
    }

  };

  static getBookById = async (req, res) => {
    const id = req.params.id;

    try{

      const bookResultById = await books.findById(id).populate("author", "name").exec();
      res.status(200).json(bookResultById);
    }catch(error){
      res
        .status(400)
        .send({ message: `${error.message} - book id not found` });
    }
  };

  static addBook = async (req, res) => {
    
    try{
      let book = new books(req.body);
      await book.save();
      res.status(201).send(book.toJSON());
    }catch(error){
      res
        .status(500)
        .send({ message: `${error.message} - Failed to add book` });
    }
    
  };

  static updateBook = async (req, res) => {
    const id = req.params.id;

    try{
      await books.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Book succesfully updated"});
    }catch(error){
      res.status(500).send({ message: `${error.message}` });
    }
    
  };

  static deleteBook = async(req, res) => {
    const id = req.params.id;

    try{
      await books.findByIdAndDelete(id);
      res.status(200).send({message: "Book removed"});
    }catch(error){
      res.status(500).send({message: `${error.message}`});
    }
  };

  static getBookByEditor = async (req, res) => {
    const editor = req.query.editor;

    try{

      const booksQuery = await books.find({
        editor: editor
      },
      {});
      res.status(200).send(booksQuery);
    }catch(error){
      res.status(500).send({message: `${error.message}`});
    }
  };

}

export default BookController;
