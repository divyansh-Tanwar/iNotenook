const mongoose=require('mongoose');

const NoteSchema=mongoose.Schema({
  Title:{
    type:String,
    require:true
  },
  discription:{
    type:String,
    require:true
  },
  tag:{
    type:String

  },
  Date:{
    type: Date,
    default:Date.now
  }
});

const note=mongoose.model('note',NoteSchema);

module.exports= note;