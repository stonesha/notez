import { db } from '@/lib/firebase'
import useStore from '@/lib/store'
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import NotesCard from '@/components/NotesCard';

const NotesGrid: React.FunctionComponent = () => {

  const uid = useStore(state => state.user.uid)

  const [value] = useCollection(
    collection(db, uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div className="grid grid-flow-row grid-cols-3 gap-4">
      {value?.docs.map(doc => 
          <NotesCard key={doc.id} id={doc.id} title={doc.data().title} contents={doc.data().contents}/>
      )}
    </div>
  )
};

export default NotesGrid;

