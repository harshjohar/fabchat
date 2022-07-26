import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router'
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../serverless/firebase';

function ChannelBar() {
    const router = useRouter();
    const server = router.query["server"] as string;

    const [serverDoc] = useDocument(doc(db, 'servers', server));
    const serverDocData = serverDoc?.data();
  return (
    <div className='h-full w-full bg-blue-500'>
        <p>{serverDocData?.['name'] as string}</p>
    </div>
  )
}

export default ChannelBar