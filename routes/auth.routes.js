const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// Endpoints

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Email is not correct.').isEmail(),
        check('password', 'Password is not correct. Min length should be 6 symbols.')
            .isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Not correct data related to registration.'
                })
            }

            const { email, password } = req.body;
            const candidate = await User.findOne({ email });

            if(candidate) {
                return res.status(400).json({ message: 'User email is available.'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });
            await user.save();

            res.status(201).json({ message: 'User created.'});

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again.'})
        }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Insert correct email.').normalizeEmail().isEmail(),
        check('password', 'Insert correct password.').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Not correct data related to system entry.'
                })
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if(!user) {
                return res.status(400).json({ message: 'User not found.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({ message: 'Password is not correct. Try again.' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecretKey'),
                {expiresIn: '1h'}
            );

            res.json({ token, userId: user.id });

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again.'})
        }
})

module.exports = router
