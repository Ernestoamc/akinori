const { Router } = require('express');
const healthRouter = require('./health.routes');
const authRouter = require('./auth.routes');
const profileRouter = require('./profile.routes');
const uploadRouter = require('./upload.routes');
const projectsRouter = require('./projects.routes');
const experienceRouter = require('./experience.routes');
const educationRouter = require('./education.routes');
const coursesRouter = require('./courses.routes');
const skillsRouter = require('./skills.routes');
const interestsRouter = require('./interests.routes');

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/upload', uploadRouter);
router.use('/projects', projectsRouter);
router.use('/experience', experienceRouter);
router.use('/education', educationRouter);
router.use('/courses', coursesRouter);
router.use('/skills', skillsRouter);
router.use('/interests', interestsRouter);

module.exports = router;
