const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = express.Router();
const Author = require('../models/author_model');

router.post('/signup', async (req, res, next) => {
    try {

        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            res.status(400).json({ Message: 'Failed to signup ,Missing required parameters' });
            return;
        }
        const result = await Author.findOne({ where: { email } });
        if (result) {
            res.status(409).json({ Message: "email already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
        console.log(hashedPassword);
        const newAuthor = await Author.create({ email:email, password:hashedPassword, username:username });
        res.status(201).json({
            Message: 'Author was created successfully ', Author: {
                id:newAuthor.id,
                email: newAuthor.email,
                username: newAuthor.username,
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Message: "Failed to create new Author", "Error": e });
    }
});

router.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ Message: 'Failed to login, Missing required parameters' });
        return;
      }
      const author = await Author.findOne({ where: { email } });
      if (!author) {
        res.status(401).json({ Message: 'Invalid email or password' });
        return;
      }
      const isPasswordValid = await bcrypt.compare(password, author.password);
      if (!isPasswordValid) {
        res.status(401).json({ Message: 'Invalid email or password' });
        return;
      }
      const token = jwt.sign({ authorId: author.id }, process.env.JWTSecret);
      res.status(200).json({ Message: 'Login successful', Token: token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ Message: 'Failed to login', Error: e });
    }
  });

module.exports = router;