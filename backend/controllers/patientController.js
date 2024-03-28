const Patient = require("../models/patient");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.patient_list = asyncHandler(async (req, res, next) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { surname: { $regex: search, $options: "i" } },
        { pesel: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { street: { $regex: search, $options: "i" } },
        { phone_number: { $regex: search, $options: "i" } },
        { health_issue: { $regex: search, $options: "i" } },
      ],
    };
  }

  const allPatients = await Patient.find(query).sort({ name: 1 }).exec();
  res.send(allPatients);
});

exports.patient_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("surname")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Surname must be specified."),
  body("pesel")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("PESEL must be specified."),
  body("city")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("City must be specified."),
  body("street")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Street must be specified."),
  body("house_number")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("House number must be specified.")
    .isNumeric()
    .withMessage("House number must be numeric."),
  body("flat_number")
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Flat number has non-alphanumeric characters."),
  body("zipcode")
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isNumeric()
    .withMessage("Zipcode must be numeric."),
  body("phone_number")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Phone number must be specified."),
  body("health_issue")
    .optional({ checkFalsy: true })
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const patient = new Patient({
      name: req.body.name,
      surname: req.body.surname,
      pesel: req.body.pesel,
      city: req.body.city,
      street: req.body.street,
      house_number: req.body.house_number,
      flat_number: req.body.flat_number,
      zipcode: req.body.zipcode,
      phone_number: req.body.phone_number,
      health_issue: req.body.health_issue,
    });
    if (!errors.isEmpty()) {
      //   res.render("patient_form", {
      //     title: "Add a patient",
      //     patient: patient,
      //     errors: errors.array(),
      //   });
      res.send(errors);
      return;
    } else {
      await patient.save();
      res.send("Patient successfully created!");
    }
  }),
];

exports.patient_detail = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id).exec();
  if (patient == null) {
    const err = new Error("patient not found");
    err.status = 404;
    return next(err);
  }
  res.send(patient);
});

exports.patient_delete_post = asyncHandler(async (req, res, next) => {
  console.log(req.body.patient_id);
  await Patient.findByIdAndDelete(req.body.patient_id);
  res.send("Patient successfully deleted!");
});

exports.patient_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("surname")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Surname must be specified."),
  body("pesel")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("PESEL must be specified."),
  body("city")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("City must be specified."),
  body("street")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Street must be specified."),
  body("house_number")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("House number must be specified."),
  body("flat_number")
    .optional({ checkFalsy: true })
    .trim()
    .escape(),
  body("zipcode")
    .optional({ checkFalsy: true })
    .trim()
    .escape(),
  body("phone_number")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Phone number must be specified."),
  body("health_issue")
    .optional({ checkFalsy: true })
    .trim()
    .escape(),
    
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.params.id);
    const patient = new Patient({
      _id: req.params.id,
      name: req.body.name,
      surname: req.body.surname,
      pesel: req.body.pesel,
      city: req.body.city,
      street: req.body.street,
      house_number: req.body.house_number,
      flat_number: req.body.flat_number,
      zipcode: req.body.zipcode,
      phone_number: req.body.phone_number,
      health_issue: req.body.health_issue,
    });
    console.log(patient);
    if (!errors.isEmpty()) {
      res.send(errors);
      return;
    } else {
      let the_patient = await Patient.findOneAndUpdate({_id: req.params.id}, patient)
      console.log(the_patient);
      res.send("Patient successfully updated!");
    }
  }),
];