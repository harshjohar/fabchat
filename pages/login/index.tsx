import { signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { auth, provider } from '../../serverless/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import Head from 'next/head';

function Login() {
  const signIn = ()=> {
    signInWithPopup(auth, provider);
  }

  const [user] = useAuthState(auth);

  const router = useRouter()

  useEffect(() => {
    if(user)
      router.push('/app')
    return () => {
      
    }
  }, [user])
  
  return (
    <div>
      <Head>
        <title>Fabchat</title>
      </Head>
      <h1>Welcome to Fabchat</h1>
      <h2>We are so excited to see you!</h2>
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}

export default Login