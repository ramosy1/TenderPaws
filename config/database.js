const mongoose = require('mongoose');

const database = async () => {
    try {
        await mongoose.connect(process.env.MDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true    
          });
    } catch(err) {
        console.log(err);
    }
}

module.exports = database;