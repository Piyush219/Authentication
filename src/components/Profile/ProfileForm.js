import { useContext, useRef } from 'react';
import AuthConntext from '../../Store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const newPasswordRef = useRef();
  const authCtx = useContext(AuthConntext)

  const submitHandler = (event) =>{
    event.preventDefault()
    const enteredNewPassword = newPasswordRef.current.value;

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD_moyHG8twZqc8YOxjyWkTaJiLUXd-vNg",{
      method: 'POST',
      body:JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: true
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      
      if(res.ok){
        console.log('Success')
        return res.json()
      }
      else{
       return  res.json().then(data => {
          // console.log(data)
          let errorMessage = 'Authentication failed!'
          // console.log(data.error.message)
          // alert(errorMessage)
          throw new Error(errorMessage);
          
        })
      }
    }).then((data) =>{
      console.log(data)
      
    }

    ).catch((err)=>{
      alert(err.message)
    });  

  }


  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
