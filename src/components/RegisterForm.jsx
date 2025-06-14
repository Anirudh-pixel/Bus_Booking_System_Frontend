import React,{useState} from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const[form, setForm] = useState({
        username:'', email:'' , password:''
    });

    const[ message, setMessage] = useState('');


    const handleChange =(a)=> {
        setForm({...form,[a.target.name]: a.target.value})
    };

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try{
            await axios.post('http://localhost:8000/api/register/', form);
            setMessage('Registration successful');
        }catch(error){
             const errMsg = error.response?.data?.username || error.message;
            setMessage('Registration failed: ' + errMsg);
        }
        };
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" name='username' value={form.username} onChange={handleChange} /><br/>
                <label>Email</label>
                <input type="email" name='email' value={form.email} onChange={handleChange}/><br/>
                <label>Password</label>
                <input type="password" name='password' value={form.password} onChange={handleChange} /><br/>
                <button type='submit'>Register</button>
            </div>
        </form>
        {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;