import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    dob: '',
    gender: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateForm();
  };

  const validateForm = () => {
    const { name, mobile, email, address, dob, gender, username, password, confirmPassword } = formData;
    if (name && mobile && email && address && dob && gender && username && password && confirmPassword && password === confirmPassword) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/signup', formData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert('Error: ' + error.response.data.message);
      });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      mobile: '',
      email: '',
      address: '',
      dob: '',
      gender: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setIsSubmitEnabled(false);
  };

  return (
    <div className="App">
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
        </div>
        <div className="input-group">
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required />
        </div>
        <div className="input-group">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
        </div>
        <div className="input-group">
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        </div>
        <div className="input-group">
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-group">
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        </div>
        <div className="input-group">
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </div>
        <div className="input-group">
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
        </div>
        <div className="button-group">
          <button type="submit" disabled={!isSubmitEnabled} className="submit-btn">Submit</button>
          <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default App;
