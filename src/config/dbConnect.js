import mongoose from "mongoose";

mongoose.connect(
	"mongodb+srv://yanarcanjo:b9VyeNZ66vhs9YPZ@alura.itxb3i5.mongodb.net/alura-node"
);

let db = mongoose.connection;

export default db;
