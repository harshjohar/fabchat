import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

function index() {
  const router = useRouter()
  const server = router.query['server']
  return (
    <div>
      <Head>
        <title>
          {server}
        </title>
      </Head>
    </div>
  )
}

export default index