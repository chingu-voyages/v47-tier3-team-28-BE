const mongoose = require('mongoose');
require("dotenv").config();

 const  DbConnection  = async ()=>{

    await  mongoose.connect(
          process.env.DB_HOST,
        ).then(() => console.log('DB Connected!'))
        .catch(err => {
          console.log(`DB Connection Error: ${err.message}`);
        });
}



module.exports = DbConnection