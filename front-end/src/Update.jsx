import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
 
const Update = () => {
    const {id} = useParams();
    const [user, setUser] = useState({
        name: "",
    });
 
    const location = useLocation();
    const navigate = useNavigate();
 
    const userId = location.pathname.split("/")[2];
 
    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
 
    useEffect(() => {
        axios.get("http://localhost:3001/userdetails/"+id)
        .then(res => {
            console.log(res)
            setUser(res.data[0]);
        })
        .catch(err => console.log(err))
    }, []);
 
    const handleClick = async (e) => {
        e.preventDefault();
 
        try {
            await axios.put(`http://localhost:3001/users/${userId}`, user);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
 
  return (
    <div className="container">
    <h1>Edit Task</h1>
        <form>
                <div className="mb-3 mt-3">
                    <label className="form-label"> Task:</label>
                    <input type="text" className="form-control" placeholder="Enter Task" name="name" value={user.name} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Update</button>
        </form>
        
    </div>
  );
};
 
export default Update;