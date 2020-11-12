const { Router } = require('express');
const config = require('config');
const shortid = require('shortid');
const Detail = require('../models/Detail');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async (req, res) => {
    console.log(req.body);

    try {
        const detail = new Detail({
            owner: req.user.userId,
            name: 'Ted',
            surname: 'Semashov',
            date: '10/06/1997'
        })

        await detail.save();
        res.status(201).json(detail);


    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again.'});
    }
})


router.get('/', auth, async (req, res) => {
    try {
        const detail = await Detail.find({ owner: req.user.userId });
        res.json(detail);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again.'})
    }
})




module.exports = router;
