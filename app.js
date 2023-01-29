require('dotenv').config();

// importamos el modelo
const Server = require('./models/server')

// instanciamos el server o la clase
const server = new Server()

// pongo para escuchar el server 
server.listen()
