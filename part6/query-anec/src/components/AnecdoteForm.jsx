import { useContext } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "../requests"
import NotificationContext from "../contexts/notificationReducer"



const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: (createdAnecdote) => {
      notificationDispatch({ type:'SET', content:`you created ${createdAnecdote.content}`})
      setTimeout(() => notificationDispatch({ type:'REMOVE' }), 5000)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      notificationDispatch({ type:'SET', content:"too short"})
      setTimeout(() => notificationDispatch({ type:'REMOVE' }), 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
