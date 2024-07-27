const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
 //const authRoutes = require("./routes/auth");
//  const path = require("path");
const messageRoute = require("./routes/messagesRoute");
const app = express();
const socket = require("socket.io");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV === 'production')
//   {
// app.use(express.static(path.join(__dirname1, '/public/build')));
// app.get('*',(req, res) =>{
//   res.sendFile(path.resolve(__dirname1, "public","build","index.html"));
// })

// }
mongoose
  .connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    
})
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });





  


const server = app.listen(PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
