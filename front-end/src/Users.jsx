import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
const Users = () => {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);
 
  console.log(users);
 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <div className="container">
    <h2 className='w-100 d-flex justify-content-center p-3'>To-Do</h2>
        <input
            type='text'
            placeholder='Search'
            onChange={ (e)=>search(e.target.value) }
        />
        <div className='row'>
            
            <div className='col-md-12'>
            <p><Link to="/add" className="btn btn-success">Add new tasks</Link></p>
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{user.name} </td>
                                <td>
                                    <Link to={`/update/${user.id}`} className="btn btn-info mx-2">Edit</Link>
                                    <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        </div>
    </div>
  );
};
 
export default Users;