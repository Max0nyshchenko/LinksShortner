const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt =  require('jsonwebtoken')
const router = Router()
const config = require('config')

router.post(
    '/register',
    [
        check('email','Invalid email').isEmail(),
        check('password', 'Invalid password, minimum password length is 4 characters')
            .isLength({min:4})
    ],
    async ( req,res ) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors:errors.array(),
                msg:'Invalid user data'
            })
        }

        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if(candidate) {
          return  res.status(400).json({msg: "Such user already exists..."})
        }

        const hashedPass = await bcrypt.hash(password, 12)
        const user = new User({email, password:hashedPass})

        await user.save()

        res.status(201).json({msg:'User created successfully'})

    } catch (e) {
        res.status(500).json({msg: "something went wrong, try again..."})
    }
})


router.post(
    '/login',
    [
        check('email', 'Type correct email').normalizeEmail().isEmail(),
        check('password', 'Type password').exists()
    ],
    async ( req,res ) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors:errors.array(),
                    msg:'Invalid user data'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({msg:'User not found...'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return res.status(404).json({msg: 'Invalid password, try again...'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {expiresIn:'1h'}
            )

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({msg:'Something went wrong...'})
        }
})

module.exports = router