import React, { useState, useEffect } from "react";
import "../App.css";

export default function Signup() {
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormValues({...formValues, [name]:value});
    console.log(formValues);
  }
  const submitHandler = (e) =>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(()=>{
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
        console.log(formValues);
    }

  },[formErrors])

  const validate = (values) =>{
    const errors = {}
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!values.name){
        errors.name = "Name is required";
    }
    if(!values.email){
        errors.email = "Email is required";
    }else if(!regex.test(values.email)){
        errors.email = "This is not a valid email format!";
    }
    if(!values.password){
        errors.password = "Password is required";
    }else if(values.password.length < 4){
        errors.password = "Password must be more than 4 characters";
    }else if(values.password.length > 10){
        errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  }
 
  return (
    <div className="outer-container">
      <h1 style={{display:"flex", justifyContent:"center"}}>Sam Deeven Form</h1>

        {Object.keys(formErrors).length === 0 && isSubmit ? (
               <pre>{JSON.stringify(formValues,undefined,2)}</pre>

        ): (
          ""
        )}
      <form onSubmit={submitHandler} className="inner-container">
        <div className="input-field">
          <label>Name</label>
          <input placeholder="Name" name="name" type="text" value={formValues.name} onChange={handleChange}/>
            <p className="warning-msg">{formErrors.name}</p>
        </div>
        <div className="input-field">
          <label>Email</label>
          <input placeholder="Email" name="email" type="email" value={formValues.email} onChange={handleChange}/>
          <p className="warning-msg">{formErrors.email}</p>
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
          />
            <p className="warning-msg">{formErrors.password}</p>
        </div>
        <div className="submit-btn">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}
