const Validator = require("validator");
const isEmpty = require("is-empty");
var connection = require('../models/User');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.department = !isEmpty(data.department) ? data.department : "";
  
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }




  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name is required";
  }
  if (Validator.isEmpty(data.department)) {
    errors.department = "Deparment Field is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};