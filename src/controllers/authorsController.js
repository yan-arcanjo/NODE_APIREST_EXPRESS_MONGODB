import authors from "../models/Author.js";

class AuthorsController {
  static getAllAuthors = async (req, res) => {
    try {

      const authorsResult = await authors.find();
      res.status(200).json(authorsResult);

    } catch (error){

      res.status(500).json({message: "Internal error on server"});

    }
    
  };

  static getAuthorById = async (req, res) => {
    const id = req.params.id;

    try{

      const authorById = await authors.findById(id);
      res.status(200).json(authorById);
    }catch(error){
      res.status(500).json({message: "Error on server"});
    }
  };

  static addAuthor = async(req, res) => {
    let author = new authors(req.body);

    try{

      await author.save();
      res.status(201).send(author.JSON());
    }catch(error){
      res.status(500)
        .send({message: "Failed to add author"});
    }

  };

  static updateAuthor = async (req, res) => {
    const id = req.params.id;

    try{

      await authors.findByIdAndUpdate(id, { $set: req.body});
      res.status(200).send({ message: "Author succesfully updated" });
    }catch(error){

      res.status(500).send({message: `${error.message}`});
    }
  };

  static deleteAuthor = async (req, res) => {
    const id = req.params.id;

    try{

      await authors.findByIdAndDelete(id);
      res.status(200).send({ message: "Author succesfully updated" });
    }catch(error){

      res.status(500).send({message: `${error.message}`});
    }
  };
}

export default AuthorsController;
