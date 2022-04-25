import { db } from "@/lib/firebase"
import useStore from "@/lib/store"
import { collection, deleteDoc, doc } from "firebase/firestore"

interface NotesCardProps {
  id: string;
  title: string
  contents: string
}

const NotesCard: React.FunctionComponent<NotesCardProps> = ({ id, title, contents }) => {

  const uid = useStore(state => state.user.uid)

  const deleteNote = async () => {
    const uid_notes_collection = await collection(db, uid)
    await deleteDoc(doc(uid_notes_collection, id))
  }

  return (
    <div className="rounded-lg bg-slate-100">
      <div className="flex flex-row justify-between mr-1">
        <p className="px-4 py-1 text-xl">{title}</p>
        <button onClick={() => deleteNote()}>
          <TrashIcon />
        </button>
      </div>
      <hr />
      <p className="p-4">{contents}</p>
    </div>
  )
};

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rounded hover:bg-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

export default NotesCard