const express = require('express');
const Post = require('../Models/posts');
const router = express.Router();

router.post('/post', (req, res, next) => {
    const post = new Post({
        studentname: req.body.studentname,
        studentlastname: req.body.studentlastname
    })
    post.save().then(createdPost => {
        console.log(createdPost.id);
    });
    res.send("User created");
    next();
})

module.exports = router;