const mongoose = require("mongoose");
const Document = require("./Document");
const express = require("express");
const cors = require("cors");

const router=require("./routes/users");


mongoose.connect("mongodb+srv://praveenkumarsacucs:LbF7wwsolHEQobBl@cluster0.wdmyxfe.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
})

const app=express();

app.use(express.json());
app.use(cors());

app.listen(3002,()=>console.log("server listening on port 3002"));

app.use("/auth",router);


const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}

