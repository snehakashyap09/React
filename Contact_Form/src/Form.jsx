import React, { useState } from 'react'
import "./App.css"
const Form = () => {
    const [form,setForm] = useState({name:"",email :"",message:""});
    const [errors,setErrors] = useState({});
    const [submittedName,setSubmittedName] = useState("");
    const [isSubmitted,setisSubmitted] = useState(false);

    const validate = ()=>{
    const newErrors = {};
    if(!form.name.trim()) newErrors.name = "Name is required"

    if(!form.email.trim()) {
        newErrors.email = "Email is required"}
        else if(!/^\S+@\S+\.\S+$/.test(form.email)){
            newErrors.email = "Email is invalid"
        }

        if(!form.message.trim()) newErrors.message = "Message is required"

        return newErrors;
    }

    const handleSubmit = (e)=>{
   e.preventDefault();
   const validationErrors = validate();

   if(Object.keys(validationErrors).length > 0){
    setErrors(validationErrors);

   }
   else{
    setisSubmitted(true)
    setSubmittedName(form.name)
    setForm({name:"",email:"",message:""});
    setErrors({})
   }
    }

    const handleUpdate = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
  return (
    <div className='form'>
      {isSubmitted ? (
       <h2>Thank you {submittedName || "User"}!</h2>
      ):
      (
        <form onSubmit={handleSubmit}>
        <div className='items'>
         <label htmlFor="name">Name:</label>
         <input type="text"
         value = {form.name}
         name= "name"
         id="name"
         onChange={handleUpdate}
         className='text-field'
         />
         {errors.name && (
            <p>{errors.name}</p>
         )}
        </div>

         <div className='items'>
         <label htmlFor="email">Email:</label>
         <input type="email"
         value = {form.email}
         name= "email"
         id="email"
         onChange={handleUpdate}
         className='text-field'
         />
          {errors.email && (
            <p>{errors.email}</p>
         )}
        </div>

         <div className='items'>
         <label htmlFor="message">Message:</label>
         <textarea
         value = {form.message}
         name= "message"
         id="message"
         onChange={handleUpdate}
         className='text-field'
         />
          {errors.message && (
            <p>{errors.message}</p>
         )}
        </div>
        <button type='submit' className='btn'>Submit</button>
        </form>
      )}
    </div>
  )
}

export default Form
