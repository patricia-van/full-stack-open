import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  }, shallowEqual)

  const byVotes = (a, b) => b.votes - a.votes

  const handleVote = async (anecdote) => {
    console.log('in handle vote for', anecdote)
    const updatedAnecdote = await anecdoteService.updatevote({...anecdote, votes: anecdote.votes+1})
    dispatch(vote(updatedAnecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {anecdotes.slice().sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList