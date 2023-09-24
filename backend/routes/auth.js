const express = require('express');
const User = require('../modals/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "Animeshisagoodb$oy";

// ROUTE 1: create a user using: POST "/api/auth/createuser". no login required
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter valid email').isEmail(),
    body('password', 'validate').isLength({ min: 5 }),
], async (req, res) => {
    let success = false
    //if there are error,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {

        //checking email validation
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, errors: "sorry user with this email id already exists" })
        }


        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        // .then(user => res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error: 'Please enter a unique value for email', message: err.message})})
        success = true;
        res.json({success, authtoken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured")
    }


})

// ROUTE 2: Authenticate the user using: POST "/api/auth/login". no login required
router.post('/login', [
    body('email', 'enter valid email').isEmail(),
    body('password', 'password cannot be empty').exists(),
], async (req, res) => {
    let success = false;
    //if there are error,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ errors: "plese try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, errors: "plese try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }


})

// ROUTE 3: Get loogedin  user details using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
});

module.exports = router