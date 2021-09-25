const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
App.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))


  app.get('/', (req, res) => {
   
   
    
    res.render('room')
  })
io.on('connection',(socket) =>{

  
socket.on('join-room',(userId)=>{
  
 
  socket.join("my-room")

 
  socket.broadcast.to("my-room").emit('user-connected', userId)

  
  socket.on('disconnect', () => {
    console.log(userId)
    socket.broadcast.to("my-room").emit('user-disconnected', userId)
  })
 

})



})


  const PORT = process.env.PORT || 4000
  
  server.listen(PORT)
