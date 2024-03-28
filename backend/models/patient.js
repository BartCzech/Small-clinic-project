const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  surname: { type: String, required: true, maxLength: 100 },
  pesel: { type: String, required: true, maxLength: 15 },
  city: { type: String, required: true, maxLength: 50 },
  street: { type: String, required: true, maxLength: 50 },
  house_number: { type: String, required: true, maxLength: 6 },
  flat_number: { type: String, maxLength: 6 },
  zipcode: { type: String, maxLength: 10 },
  phone_number: { type: String, required: true, maxLength: 15 },
  date_of_birth: { type: Date, time: false },
  health_issue: { type: String, maxLength: 500 },
});

PatientSchema.virtual("url").get(function () {
  return `/patients/${this._id}`;
});

module.exports = mongoose.model("Patient", PatientSchema);