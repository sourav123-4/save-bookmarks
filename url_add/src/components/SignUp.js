import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/Action";
function SignUp() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
    phone: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name is ", name);
    if (name === "firstname") {
      console.log("firstname is ", user.name.firstname);
      setUser({
        ...user,
        name: { ...user.name, firstname: value },
      });
    } else if (name === "lastname") {
      setUser((prev) => ({
        ...prev,
        name: { ...prev.name, lastname: value },
      }));
    } else {
      setUser((prev) => ({
        ...user,
        [name]: value,
      }));
    }
  };
  const handleSubmit = () => {
    dispatch(addUser(user));
  };
  console.log("user data", user);

  return (
    <div>
      <h2>SignUp</h2>
      <input
        placeholder="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        placeholder="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <input
        placeholder="firstname"
        name="firstname"
        value={user.name.firstname}
        onChange={handleChange}
      />
      <input
        placeholder="lastname"
        name="lastname"
        value={user.name.lastname}
        onChange={handleChange}
      />
      <input
        placeholder="phone no"
        name="phone"
        value={user.phone}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Create Account</button>
    </div>
  );
}

export default SignUp;
