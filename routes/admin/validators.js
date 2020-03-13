const {check} = require("express-validator");
const usersRepo = require("../../repositories/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email address.")
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({email});
      if (existingUser) {
        throw new Error("Email has already been used.");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({min: 5, max: 80})
    .withMessage("Must be between 5 and 80 characters."),
  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({min: 5, max: 80})
    .withMessage("Must be between 5 and 80 characters.")
    .custom((passwordConfirmation, {req}) => {
      if (req.body.password !== passwordConfirmation) {
        throw new Error("The passwords entered do not match.");
      }
      return true;
    }),
  requireExistingEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email.")
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({email});
      if (!user) {
        throw new Error("No such email exists!");
      }
    }),
  requireCorrectPassword: check("password")
    .trim()
    .custom(async (password, {req}) => {
      const user = await usersRepo.getOneBy({email: req.body.email});
      if (!user) {
        throw new Error("Incorrect credentials");
      }
      const correctPassword = await usersRepo.comparePasswords(user.password, password);
      if (!correctPassword) {
        throw new Error("Incorrect password");
      }
    }),
  requireTitle: check("title")
    .trim()
    .isLength({min: 3, max: 40})
    .withMessage("Must be between 3 and 40 characters."),
  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({min: 1})
    .withMessage("Must be a price of at least $1.00.")
}