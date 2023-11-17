const { Schema, model,mongoose } = require("mongoose")

const Document = new Schema({
  _id: String,
  data: Object,
  docName:String,
  description:String,
  publicID:String,
  privateID:String,
  userOwner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    // required:true
  }
  
})

module.exports = model("Document", Document)
