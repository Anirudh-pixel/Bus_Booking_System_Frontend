import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const LoginForm = ({onLogin}) => {
    const[form, setForm] = useState({ username:'', password:'' });
    const[message, setMessage] = useState('');
    const navigate =useNavigate();

    const handleChange =(a)=> {
        setForm({...form,[a.target.name]: a.target.value})
    };

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('https://travease-backend.onrender.com/api/login/', form)
            setMessage('Login Successful')
            if(onLogin){
                onLogin(response.data.token, response.data.user_id)
            }
            setTimeout(() => {
                navigate('/buslist'); // redirect to home after a short delay
            }, 1000);
        }catch(error){
            const errMsg = error.response?.data?.detail || error.message;
            setMessage('Login Failed: ' + errMsg);
        }
    };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <label className="block mb-2">Username</label>
            <input type="text" name='username' value={form.username} onChange={handleChange} 
                   className="w-full p-2 border rounded mb-4"/>
            <label className="block mb-2">Password</label>
            <input type="password" name='password' value={form.password} onChange={handleChange} 
                   className="w-full p-2 border rounded mb-4"/>
            <button type='submit' className="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600">Login</button>
            {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
        </form>
    </div>
  );
};

export default LoginForm;