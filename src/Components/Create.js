import React, { useState } from 'react';
import { useCrud } from './contextApi/contextapi';
import { Link } from 'react-router-dom';

const Create = () => {
  const {name, email, role, setName, setEmail, setRole, handleSubmit } = useCrud();
   
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");

    if (!name.trim()) {
      setNameError("Name cannot be empty");
      return;
    }

    if (!email.trim()) {
      setEmailError("Email cannot be empty");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    handleSubmit(name, email, role);
  };

  return (
    <div className="container mt-5">
      <div className='d-flex justify-content-between mb-3'>
        <h1>Create</h1>
        <Link to="/read">
          <button className="btn btn-sm btn-primary">Show data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={(e) => { setName(e.target.value) }} />
          {nameError && <div className="text-danger">{nameError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => { setEmail(e.target.value) }} />
          {emailError && <div className="text-danger">{emailError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Create;
