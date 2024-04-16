import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCrud } from './contextApi/contextapi';

const Update = () => {
  const { handleUpdate, setEmail, setId, setName, name, email, role, setRole } = useCrud();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setId(localStorage.getItem('id'));
    setName(localStorage.getItem('name'));
    setEmail(localStorage.getItem('email'));
    setRole(localStorage.getItem('role'));
  }, []);

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

    handleUpdate();
  };

  return (
    <>
      <h1>Update</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          {nameError && <div className="text-danger">{nameError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
         </div>
        <button
          type="submit"
          className="btn btn-primary mx-2"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
        <Link to="/read">
          <button className="btn btn-primary mx-2">Back</button>
        </Link>
      </form>
    </>
  );
};

export default Update;
