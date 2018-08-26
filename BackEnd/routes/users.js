
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const Auth = require('../middlewars/auth');


router.get('/', Auth , async (req, res) => {
    const result = await Users
        .find({isDeleted : ! true});
    res.send(result);
})

router.get('/deletedusers', Auth, async (req, res) => {
    const result = await Users
        .find({ isDeleted: true });
    res.send(result);
})


router.get('/:id', Auth , async (req, res) => {
    const query = req.params.id;
    console.log(query);
    const result = await Users
        .aggregate([
            {
                $match: {
                    user_id: parseInt(query),
                    isDeleted : ! true
                }
            },
            {
                $lookup: {
                    from: "users_types",
                    localField: "utype_id",
                    foreignField: "utype_id",
                    as: "usertype"
                }
            },
            { $unwind: '$usertype' },
            {
                $project: {
                    'usertype._id': 0,
                    'usertype.utype_id': 0,
                    'usertype.__v': 0
                }
            }
        ]);
    res.send(result);
})

router.post('/', Auth,async (req, res) => {
    const user = new Users({
        user_name : req.body.user_name,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        utype_id: req.body.utype_id
    });
    const check = await Users.findOne({user_name:user.user_name});
    const check1 = await Users.findOne({ email: user.email });

    try {
        if(check) return res.status(400).send("user name already reg");
        if (check1) return res.status(400).send("email already reg");
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt);

        await user.save();
        res.json("added");
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/:id', Auth,async (req, res) => {
    const updated = req.body;
    const query = await Users.findOne({ user_id: req.params.id , isDeleted : ! true});
    try {
        if(!query) return res.status(400).send('invalid user id');
        await Users.update(query, updated);
        res.json("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/:id', Auth,async (req, res) => {
    const query =await Users.findOne({ user_id: req.params.id });
    try {
        if (!query) return res.status(400).send('invalid user id')
        await Users.update(query,{isDeleted : true});
        res.json("isDeleted set to be true");
    } catch (error) {
        res.send(error.message);
    }

})

// router.delete('/:id', Auth, async (req, res) => {
//     const query = await Users.findOne({ user_id: req.params.id });
//     try {
//         if (!query) return res.status(400).send('invalid user id')
//         await Users.remove(query);
//         res.json("removed");
//     } catch (error) {
//         res.send(error.message);
//     }

// })






module.exports = router;
