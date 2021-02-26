import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import route from './routes/index.js'
import path from 'path'
import morgan from 'morgan'
import http from 'http';
import { Server } from 'socket.io';
import Chat from './models/chat.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  }
})


// env config
dotenv.config()
app.use(morgan('dev'))
// Express config
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use('/public', express.static(path.resolve(path.join('src', 'uploads'))))

// Policy config
app.use(cors())

// Routes
route(app);




// Socket
io.on("connection", (socket) => {
  console.log("We have a new connection!!!");


  socket.on('room', (room) => {
    socket.join(room);
  });

  socket.on('Input chat message', async (msg) => {
    try {
      const newChat = new Chat({
        message: msg.message,
        sender: msg.sender,
        receiver: msg.receiver
      })
      const chat = await newChat.save()
      const message = await Chat.aggregate([
        { $match: { _id: chat._id } },
        { $lookup: { from: 'users', localField: 'sender', foreignField: '_id', as: 'sender' } },
        { $lookup: { from: 'users', localField: 'receiver', foreignField: '_id', as: 'receiver' } },
        { $unwind: "$sender" },
        { $unwind: "$receiver" },
      ])
      console.log(message)
      const room = 'Joker'
      io.to(room).emit('Output chat message', message)
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("disconnection", () => {

  });
});


// MongoDB config
mongoose.connect(process.env.CONNECTION_URL_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Mongoose connected'))
  .then(() => server.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`)))
  .catch((error) => console.log(error.message))







