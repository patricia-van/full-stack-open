import Notes from './components/Notes'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/visibilityFilter'

const App = () => {
  return(
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App