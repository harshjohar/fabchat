import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/user/userSlice'
import { redirectToLogin } from '../../../utils/functions';

function index() {
  const user = useSelector(selectUser);
  const router = useRouter()
  useEffect(() => {
    if(!user.email) {
      redirectToLogin(router)
    }
  }, [user])
  
  return (
    <div>
        <Head>
            <title>Fabchat</title>
        </Head>
        <p>{user.displayName}</p>
    </div>
  )
}

export default index