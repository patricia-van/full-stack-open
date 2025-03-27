// import { useEffect } from 'react'
// import Notes from './components/Notes'
// import NewNote from './components/NewNote'
// import VisibilityFilter from './components/visibilityFilter'
// import { initializeNotes } from './reducers/noteReducer'
// import { useDispatch } from 'react-redux'

// const App = () => {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(initializeNotes()) 
//   }, []) 



//   return(
//     <div>
//       <NewNote />
//       <VisibilityFilter />
//       <Notes />
//     </div>
//   )
// }

// export default App

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }
  
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  

  const notes = result.data

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App