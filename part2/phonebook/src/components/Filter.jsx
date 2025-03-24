const Filter = ({search, setSearch}) => <p>filter shown with: <input value={search} onChange={(event) => setSearch(event.target.value)}/></p>

export default Filter;