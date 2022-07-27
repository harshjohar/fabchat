import React from 'react'

function UserDp({name}: {name?: string}) {
  return (
    <div className='h-10 w-10 rounded-full bg-red-400 flex items-center justify-center'>
        name ? name[0] : X
    </div>
  )
}

export default UserDp