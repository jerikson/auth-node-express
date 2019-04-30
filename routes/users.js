const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

// Exchange email and password for the token
router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

// Exchange token using existing email and password
router.route('/signin')
    .post(UsersController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt', { session:  false }), UsersController.secret);

module.exports = router;