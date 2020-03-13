const express = require("express");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {requireEmail, requirePassword, requirePasswordConfirmation, requireExistingEmail, requireCorrectPassword} = require("./validators");
const {handleErrors} = require("./middlewares");

const router = express.Router();

// signup route handler
router.get("/signup", (req, res) => {
  res.send(signupTemplate({req}));
});

router.post("/signup", 
  [requireEmail, requirePassword, requirePasswordConfirmation], 
  handleErrors(signupTemplate),
  async (req, res) => {     
    const {email, password} = req.body;
    const user = await usersRepo.create({email, password});
    req.session.userId = user.id;
    res.redirect("/admin/products");
});

// signout route handler
router.get("/signout", (req, res) => {
  req.session = null;
  res.redirect("/signin");
});

// signin route handler
router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post("/signin", 
  [requireExistingEmail, requireCorrectPassword], 
  handleErrors(signinTemplate),
  async (req, res) => {
    const {email} = req.body;
    const user = await usersRepo.getOneBy({email});
    
    req.session.userId = user.id;
    res.redirect("/admin/products");
});

module.exports = router;