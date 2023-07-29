const http = require("http");
const port = 3000;

const routes = {
	"/": "Curso de Node",
	"/books": "Books page",
	"/authors": "Authors list",
	"/editor": "Editors list",
};

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end(routes[req.url]);
});

server.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});
