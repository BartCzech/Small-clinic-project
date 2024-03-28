import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './updatePatient.css';

const UpdatePatient = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    pesel: "",
    city: "",
    street: "",
    house_number: "",
    flat_number: "",
    zipcode: "",
    phone_number: "",
    health_issue: "",
  });

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/patients/patient/${id}`
      );
      console.log(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/patients/patient/${id}/update`,
        formData
      );
      console.log(response.data);
      if (response.data.errors) {
        response.data.errors.forEach((error) => alert(error.msg));
      } else {
        alert("Patient successfully updated!");
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        surname: "",
        pesel: "",
        city: "",
        street: "",
        house_number: "",
        flat_number: "",
        zipcode: "",
        phone_number: "",
        health_issue: "",
      });
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };
  return (
    <div className="create-patient-container">
      <h2>
        Update patient {formData.name} {formData.surname}
      </h2>
      <form onSubmit={handleUpdate}>
        <label>
          <span>Name:</span>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          <span>Surname:</span>

          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          <span>Pesel:</span>

          <input
            type="text"
            name="pesel"
            value={formData.pesel}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          <span>City:</span>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          <span>Street:</span>

          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          <span>House number:</span>

          <input
            type="text"
            name="house_number"
            value={formData.house_number}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          <span>Flat number:</span>

          <input
            type="text"
            name="flat_number"
            value={formData.flat_number}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <span>Zipcode:</span>

          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <span>Phone number:</span>

          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          <span>Health issue:</span>

          <input
            type="text"
            name="health_issue"
            value={formData.health_issue}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePatient;
