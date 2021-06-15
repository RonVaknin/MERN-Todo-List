

export default function SearchBar ({filterList}){

    return (
        <div>
            <label htmlFor="title">Search Bar </label>
           <input type="text" placeholder="search" 
           onChange={(e) => filterList(e.target.value)} ></input>
        </div>
    );
}
