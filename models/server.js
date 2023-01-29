const express = require('express');
const { userRouter } = require('../routes/user.routes');
const cors = require('cors');
const { db } = require('../database/db');
const morgan = require('morgan');
const { repairsRouter } = require('../routes/repairs.routes');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;

        this.paths = {
            users: '/api/v1/users',
            repairs: '/api/v1/repairs'
        }

        this.database()

        this.middlewares()
        this.routes()
    }

    middlewares(){
if(process.env.NODE_ENV === 'development'){
    this.app.use(morgan('dev'))
}

        this.app.use(cors());
        this.app.use(express.json());
    }

    database(){
        db.authenticate()
        .then(() => console.log('Database authenticated'))
        .catch(error => console.log(error))

        db.sync()
        .then(() => console.log('Database synced'))
        .catch(error => console.log(error))
    }

    // RUTAS
    routes() {
        this.app.use(this.paths.users, userRouter)
        
        this.app.use(this.paths.repairs, repairsRouter)
    };

    // METODO PARA ESCUCHAR EL PORT
    listen() {
        this.app.listen(this.port, () => {
            console.log('server is running on port', this.port);
        })
    }
}

module.exports = Server