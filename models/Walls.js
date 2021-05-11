const mongoose = require('mongoose');
const WallsSchema = new mongoose.Schema({
   
    hot:{
        type:[String],
    },
    pool:{
        type:[String],
    },
    cold:{
        type:[String],
          }
    
})

module.exports = Walls = mongoose.model('wall', WallsSchema)