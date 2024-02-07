const express = require('express');
const cors = require('cors');
const DbConnection = require('./config/db.js');// pulling conn file

const creating = require('./routes/courseRoute.js'); //calling create course router
const Createmodules = require('./routes/moduleRoute.js');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const courseEnrollmentRoute = require('./routes/courseEnrollmentRoute.js');
require('dotenv').config(); // Load environment variables from .env file and the root (optional behind the scene)

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', creating); // mounting the middleware function creating at the specified api path "/api/v1"
app.use('/api/v1', Createmodules)

app.use('/api/v1', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);

// Course Enrollment
app.use('/api/v1/enrollment', courseEnrollmentRoute);


app.get('/', (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.listen(process.env.port, (error) => {

  DbConnection(); // extracted the mongoose connection into the config folder and called the function 

  if (!error)
    console.log("Server is Successfully Running, " + "and App is listening on port " + process.env.port);
  else
    console.log("Error occurred, server can't start", error);
}
); 