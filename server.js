const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

mongoose.connect(
  process.env.DB_HOST,
).then(() => console.log('DB Connected!'))
.catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
});

app.get('/', (req, res)=>{ 
  res.status(200); 
  res.send("Welcome to root URL of Server"); 
});

app.listen(port, (error) =>{ 
  if(!error) 
      console.log("Server is Successfully Running, " +
                  "and App is listening on port "+ port); 
  else 
      console.log("Error occurred, server can't start", error); 
  } 
); 