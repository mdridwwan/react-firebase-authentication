import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile   } from "firebase/auth";
import initializeAuthenticarion from './firebase/firebase.init';
import { useState } from 'react';

initializeAuthenticarion()

function App() {
  const [name, setName] = useState('')
  const [email, setEmaila] = useState('')
  const [password, serPassword] = useState('')
  const [error, setError] = useState('')
  const [user, userSet] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  // // const{displayName, email, photoURL} = user;
  // const details ={
  //   name: displayName,
  //   email: email,
  //   photo: photoURL
  // }
  // console.log(details)
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
    const handleWithGoogle = () =>{
      signInWithPopup(auth, googleProvider)
      .then(result =>{
        const user = result.user;
        userSet(user)
      })

    }

    const handleNameChange = e =>{
      setName(e.target.value);
    }
    const toggleLogin = e =>{
      setIsLogin(e.target.checked)
    }

    const handleEmailChange = e =>{
      setEmaila(e.target.value)
    }
    const handlePassChange = e =>{
      serPassword(e.target.value)
    }
   
   const handleRegistration = e =>{
      console.log(email, password);
      e.preventDefault();
     
      //toggle
      isLogin? processLogin(email, password) : createNewUser(email, password)
    }
    const processLogin = (email, password)=>{
      signInWithEmailAndPassword(auth, email, password)
      .then(result =>{
        const user = result.user;
        console.log(user);
        setError('')
      })
      .catch(error =>{
        setError(error.message);
      })
    }

    const createNewUser = (email, password) =>{
      if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
        setError(' Ensure string has two uppercase letters.')
        return;
      }
      if(!/(?=.*[!@#$&*])/.test(password)){
        setError('Ensure string has one special case letter.(!@#$&*)')
        return;
      }
      if(!/(?=.*[0-9].*[0-9])/.test(password)){
        setError('Ensure string has two digits(0-9)')
        return;
      }
      if(!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)){
        setError(' Ensure string has three lowercase letters.(a-z)')
        return;
      }
      if(password.length < 8){
        setError('Password should be at least 8 characters.')
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
      const user = result.user;
      console.log(user)
      setError('');
      verifyEmail();
      setUserName();
  })
      .catch(error =>{
        const errorSlice = error.message.slice(9)
        setError(errorSlice);
      })
    }

    const setUserName = () =>{
      updateProfile(auth.currentUser, {
        displayName: name
      })
      .then(result =>{
        
      })
    }

    const verifyEmail = () =>{
      sendEmailVerification(auth.currentUser)
      .then( result=>{
        console.log(result);
      })
    }

    const handleRestPassword = () =>{
      sendPasswordResetEmail(auth, email)
      .then( result =>{
        console.log(result)
        setError('Please Check Your Email')
      })
    }

  return (
    <div className="m-5">
      <form className="container" onSubmit={handleRegistration}>
        <h3 className="text-primary">Plaese {isLogin ? 'Login' : 'Register'}</h3>
        {!isLogin && <div className="row mb-3">
         <label htmlFor="inputAddress" className="col-sm-2 col-form-label">Name:</label>
        <div className="col-sm-10">
        <input onBlur={handleNameChange} type="text" className="form-control" placeholder="Your name"/>
        </div>
        </div>}
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={handleEmailChange} type="email" name="email" className="form-control" id="inputEmail3" required/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" name="password" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handlePassChange} type="password" className="form-control" id="inputPassword3" required />
    </div>
  </div>
  
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
        <label className="form-check-label" htmlFor="gridCheck1">
          Already Registered?
        </label>
        <button onClick={handleRestPassword} type="button" className="btn btn-primary btn-sm">Reset Password</button>
      </div>
    </div>
  </div>
  <div className="row mb-3 text-danger">{error}</div>
  <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
</form>
      <div>----------------------------------</div>
      <br /><br /><br />
        <button onClick={handleWithGoogle}>Sign in Google</button>
    </div>
  );
}

export default App;
