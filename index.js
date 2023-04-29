//Imports packages
const express = require ('express');
const handlebars = require('express-handlebars');
const viewRouter = require('./src/routes/viewsRouter');
const {Server} = require('socket.io');
const {sockets} = require('./sockets');
const cookieRouter = require('./src/routes/cookie.Router.js')
const sessionRouter = require('./src/routes/session.router.js')

//Imports Routes
const productsRouter = require('./src/routes/productsRouter');
const cartsRouter = require('./src/routes/cartsRouter');
const { objConfig } = require('./src/config/config');


// _________________________________ cookies _________________________________
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')

const fileStorage = FileStore(session)
const {create} = require('connect-mongo')






//Port
const port = 8080;






const app = express();
const httpServer = app.listen(port,()=>console.log(`Listening in port ${port}`));

//Socket
const socketServer = new Server(httpServer);
sockets(socketServer);


objConfig.connectDB() 
/*--Middleware--*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//View Engine
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'handlebars');

//Static archives
app.use(express.static(__dirname + '/src/public'))

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouter);

app.use('/cookie', cookieRouter)
app.use('/session', sessionRouter)





// memoria
// app.use(session({
//     secret: 'secretCoder',
//     resave: true,
//     saveUninitialized: true
// }))


//archivo
// app.use(session({
//     store: new fileStorege({
//         ttl: 10000000,
//         retries: 0,
//         path: __dirname+'/fileSession'
//     }),
//     secret: 'secretCoder',
//     resave: true,
//     saveUninitialized: true
// }))


// base de datos
//uri  http://localhost - mongodb://localhost - mongo+srv://alsdjflsa
app.use(session({
    store: create({
        mongoUrl: objConfig.url,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 100000000*24
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))



app.use('/virtual' ,express.static(__dirname+'/public'))
// app.use(cookieParser())




