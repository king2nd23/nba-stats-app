function Search ({onSearch}) {
    let searchTerm;

    const submitSearch = (e) => { 
        e.preventDefault();
        onSearch(searchTerm)
    }

    const handleInput = (e) => { 
        searchTerm = e.target.value;
    }

    return (
        <div className="search-form">
            <form onSubmit={submitSearch} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
                <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Search
                </label>
                <div className="relative">
                    <input onChange={handleInput} className="shadow appearance-none border-2 border-green-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="search-input" type="text" placeholder="Search players and stats" />
                    <span className="gg-search"></span>
                </div>     
                </div>
            </form>
        </div>
    )
}

export default Search;