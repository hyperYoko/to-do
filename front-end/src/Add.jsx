import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
const Add = () => {
  const [users, setUser] = useState({
    name: "",
  });
 
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/create", users);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <div className="container">
    <h2 className='w-100 d-flex justify-content-center p-3'>Add New Task</h2>
        <div className='row'>
            <div className='col-md-12'>
                <h3>Add Your Detail</h3>
                <form>
                    <div className="mb-3 mt-3">
                        <label className="form-label"> Task:</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter Task" name="name" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Task</button>
                </form>
            </div>
        </div>
</div>
  );
};
 
export default Add;
