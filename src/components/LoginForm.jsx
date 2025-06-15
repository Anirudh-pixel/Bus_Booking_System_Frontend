import React,{useState} from 'react';
import axios from 'axios';


const LoginForm = ({onLogin}) => {
    const[form, setForm] = useState({
        username:'', password:''
    });

    const[ message, setMessage] = useState('');


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
        }catch(error){
            const errMsg = error.response?.data?.detail || error.message;
            setMessage('Login Failed: ' + errMsg);
        }
        };
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" name='username' value={form.username} onChange={handleChange} /><br/>
                <label>Password</label>
                <input type="password" name='password' value={form.password} onChange={handleChange} /><br/>
                <button type='submit'>Login</button>
            </div>
        </form>
        {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;