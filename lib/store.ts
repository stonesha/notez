import create from 'zustand'

export interface User {
  displayName: string | null
  email: string | null
  photoURL: string | null
  uid: string
}

interface Store {
  user: User,
  setUser: (user: User) => void,

  notes: any[],
  appendNote: (note: any) => void,
}

const useStore = create<Store>(set => ({
  user: {} as User,
  setUser: (user: User) => set(() => ({ user })),

  notes: [],
  appendNote: (note: any) => set(state => ({ notes: [...state.notes, note] })),
}))

export default useStore