const mongoose=require('mongoose');
//connecting mongoose server
const connectToMongoose= async function(){
  try {
    await mongoose.connect('mongodb://localhost:27017/baby');
  } catch (error) {
    handleError(error);
  }
}

module.exports=connectToMongoose;