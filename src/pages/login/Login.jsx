import { React, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { login } from '../../redux/apiCalls';
import "./login.css"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null)
  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, { username, password })
    setErr(error)
  }
  console.log(err);
  return (
    <div className='login'>
      <div className="loginContainer">
        <div className="loginRight">
          <div className="loginRightTitle">Sign in</div>
          <input className='loginRightInput' type="text" placeholder='username' onChange={e => setUsername(e.target.value)} />
          <input className='loginRightInput' type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
          <button className='loginRightButton' onClick={handleClick}>LOGIN</button>
          {err &&<span className="loginRightRegister">Some things went rong!! </span>}
          <span className="loginRightRegister">If you don't have account Register</span>
        </div>
        <div className="loginLeft">
          <img className='loginLeftImg' src="./login.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
