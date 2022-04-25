import { useRef } from 'react'
import { TextInput } from '@mantine/core'
import { Textarea } from '@mantine/core'

import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import useStore from '@/lib/store'

const NoteTaker: React.FC = () => {

  const uid = useStore(state => state.user.uid)

  const noteTitleRef = useRef<HTMLInputElement>(null)
  const noteContentsRef = useRef<HTMLTextAreaElement>(null)

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      createNote()
    }
  }

  const createNote = async () => {
    const title = noteTitleRef.current?.value
    const contents = noteContentsRef.current?.value

    if (!title || !contents) {
      return
    }

    const note = {
      title,
      contents,
      createdAt: new Date(),
      uid,
    }
    
    const uid_notes_collection = await collection(db, uid)
    await addDoc(uid_notes_collection, note)
  }

  return (
    <div className="flex justify-center">
      <div className="w-2/5" onKeyDown={handleEnter}>
        <TextInput placeholder="Note title..." ref={noteTitleRef}/>
        <hr className="my-1"/>
        <Textarea placeholder="Your notable contents..." ref={noteContentsRef}/>
      </div>
    </div>
  )
};

export default NoteTaker;
