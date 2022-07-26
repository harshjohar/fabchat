import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

function Channel() {
  const router = useRouter()
  const server = router.query['server']
  const channel = router.query['channel']
  return (
    <div>
      <Head>
        <title>
          {channel}
        </title>
      </Head>
      
    </div>
  )
}

export default Channel