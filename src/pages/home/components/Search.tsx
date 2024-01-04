import { useHomeContext } from '../../../context/home_context/Use_home_context'

const Search = () => {
  const { filterPosts } = useHomeContext()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterPosts(e.target.value)
  }

  return (
    <div className='search__background'>
      <div className='search__input'>
        <img src='search.svg' alt='Search' />
        <input
          type='text'
          placeholder='Buscar...'
          onChange={(e) => handleSearch(e)}
        />
      </div>
    </div>
  )
}

export default Search
