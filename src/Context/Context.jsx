import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { db , app} from '../firebase';
import { CleaningServices } from '@mui/icons-material';



export const GlobalContext=createContext(null); 

const Context = ({children}) => {
    const [user, setUser]=useState();
    const auth = getAuth(app);
    const [load, setLoad] = useState(true);

    
    // const createUser = (email, password) => {
    //     setLoad(true);
    //     console.log(email, password);
    //     return createUserWithEmailAndPassword(auth, email, password);
    // }
    
    const LogIn = (email, password) => {
        // console.log(email, password, "context api");
        setLoad(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // const signInWithGoogle = (googleProvider) => {
    //     setLoad(true);
    //     return signInWithPopup(auth, googleProvider);
    // }



    const LogOutAll=()=>{
        setLoad(true);
        return signOut(auth);
      }

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log('inside auth state change', currentUser);

            if (currentUser === null || currentUser.uid) {
                setUser(currentUser);
            }
            setLoad(false);
        });

        return () => {
            unsubscribe();
        }

    }, [])


    // console.log(createUser);

    const AuthInfo = {user, load,auth, LogIn, LogOutAll};
    // console.log(children);
    
    return (
        <GlobalContext.Provider value={AuthInfo}>
            {children}
        </GlobalContext.Provider>
    );
};

export default Context;