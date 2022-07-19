import { getAuth, createUserWithEmailAndPassword, updateProfile  , signOut, onAuthStateChanged, signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup, getIdToken } from "firebase/auth";
import { useEffect, useState } from "react";
import AuthenticationInitialize from "../Firebase/Firebase.init";

AuthenticationInitialize();

const googleProvider = new GoogleAuthProvider();

const useFirebase = () =>{

    const [user, setUser] = useState({});
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');
    


    const auth = getAuth();

    const registerUser = (email, password, name , location, history) =>{
        setIsLoading(true)
        createUserWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
        setErr('');
        const newUser = {email, displayName:name};
        console.log(newUser);
        setUser(newUser);
        savedUser(email, name, 'POST');

        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
            
          }).catch((error) => {

          });
          console.log(user)
        const destination = location?.state?.from?.pathname || '/';
            
        history(destination, { replace: true });
    
    })
    .catch((error) => {
        setUser({})
    setErr(error.message);

    })
    .finally(() => setIsLoading(false))
    }

    const logOut = () =>{
        setIsLoading(true)
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser({});
          }).catch((error) => {
            // An error happened.
          })
          .finally(() => setIsLoading(false))
    };

    const signWithUser = (email, password,location, history, ) =>{
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password, location, history)
        .then((userCredential) => {
            setErr('');

            const destination = location?.state?.from?.pathname || '/';
            
            history(destination, { replace: true });
            
            setUser(userCredential.user)
            
        })
        .catch((error) => {
            setUser({});
            setErr(error.message);
        })
        .finally(() => setIsLoading(false));
    }

    const signInWithGoogle = (location, history) =>{

        setIsLoading(true)
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            // console.log(location?.state?.from?.pathname || '/')
            const user = result.user;
            setErr('');
            savedUser(user.email, user.displayName, 'PUT')
            const destination = location?.state?.from?.pathname || '/';
            
            history(destination, { replace: true });
            
            setUser(result.user);
            
        }).catch((error) => {
            setErr(error.message);
        }).finally(() => setIsLoading(false));
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              
                setUser(user);
                getIdToken(user)
                .then(UserIdToken => {
                    setToken(UserIdToken);
                })
            } 
            else {

              setUser({});
            }
            setIsLoading(false)
        });

        return () => unsubscribe;
    }, [auth])

    useEffect(()=>{

        fetch(`https://gentle-cove-17963.herokuapp.com/users/${user.email}`)
        .then(res => res.json())
        .then(data => setAdmin(data.admin))

    },[user.email])


    const savedUser = ( email, displayName , method ) =>{
        const users = { email, displayName };

        fetch('https://gentle-cove-17963.herokuapp.com/users',{
            method: method,
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(users)
        })
        .then()
    }

  return{
      user,
      isLoading,
      admin,
      err,
      token,
      registerUser,
      signInWithGoogle,
      logOut,
      signWithUser
  }
}

export default useFirebase;