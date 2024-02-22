const express = require("express");
const router = express.Router();
const { createModule, getAllModules, deleteModule, updateModule } = require("../controllers/moduleController"); // Fixed the import statement

// Creating module routes using express.Router() which allows you to modularize your routes into separate routers
// and then we call it into the server.js' express() instance.
router.post('/createmodule', createModule);
router.get('/getAllModules', getAllModules);
router.delete('/deleteModulebyId', deleteModule);
router.post('/updateModule', updateModule);

module.exports = router;
