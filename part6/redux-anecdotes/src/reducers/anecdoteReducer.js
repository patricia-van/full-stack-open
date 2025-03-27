import { createSlice } from '@reduxjs/toolkit'
import annecdoteService from '../services/anecdotes'

const slice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const anecdote = state.find(a => a.id === action.payload)
      if (anecdote) {
        anecdote.votes += 1 
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnnecdotes(state, action) {
      console.log('setting anecdotes', action.payload)
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnnecdotes } = slice.actions

export const initialiseAnnecdotes = () => {
  return async dispatch => {
    const annecdotes = await annecdoteService.getAll()
    dispatch(setAnnecdotes(annecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnnecdote = await annecdoteService.create(content)
    dispatch(appendAnecdote(newAnnecdote))
  }
}

export default slice.reducer