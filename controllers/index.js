const express = require("express");
const router = express.Router();
const thoughtRoutes = require('./thoughtcontroller');
const userRoutes = require('./usercontroller');

router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);

module.exports = router;