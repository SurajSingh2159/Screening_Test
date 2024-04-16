import React, { useState, createContext, useContext } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CrudContext = createContext();

export const CrudProvider = ({ children }) => {
      const [id, setId] = useState("")
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [role, setRole] = useState("user");
      
      const navigate = useNavigate()

      const handleSubmit = (name, email,role) => {
            axios.post("https://661a727d125e9bb9f29c186e.mockapi.io/api/crudapi", {
                  name: name,
                  email: email,
                  role: role,
                  header: { "Access-Control-Allow-Origin": "*" }
            })
                  .then(() => {
                        navigate("/read");
                  })
                  .catch(error => {
                        console.error('Error:', error);
                  });
      };

      const [data, setData] = useState([])
      const getData = () => {
            axios.get('https://661a727d125e9bb9f29c186e.mockapi.io/api/crudapi').then((response) => {
                  setData(response.data)
            })
      }



      const handleDelete = (id) => {
            axios.delete(`https://661a727d125e9bb9f29c186e.mockapi.io/api/crudapi/${id}`).then(() => {
                  getData()
            })
      }

      const setLocalStorage = (id, name, email, role) => {
            localStorage.setItem('id', id)
            localStorage.setItem('name', name)
            localStorage.setItem('email', email)
            localStorage.setItem('role', role)
      }

      
      

      const handleUpdate = () => {
            axios.put(`https://661a727d125e9bb9f29c186e.mockapi.io/api/crudapi/${id}`, {
                  name: name,
                  email: email,
                  role: role
            }).then(() => {
                  navigate("/read")
            })
      }

      return (
            <CrudContext.Provider value={{ handleSubmit, data, setLocalStorage, handleDelete, getData, handleUpdate, setEmail, setId, setName, email, name, role,setRole }}>
                  {children}
            </CrudContext.Provider>
      );
};

export const useCrud = () => useContext(CrudContext);
