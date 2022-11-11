const router = require('express').Router();
const UserRoutes = require(`./user-routes`);
const PersonRoutes = require('./person-routes');
const NotesRoutes = require('./note-routes');

router.use('/user', UserRoutes);
router.use('/person', PersonRoutes);
router.use('/notes', NotesRoutes);

module.exports = router;