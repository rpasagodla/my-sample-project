import {useState, useEffect} from 'react';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [sortOrder,setSortOrder] = useState("asc")
    // adding search filter
    const [search, setSearch] = useState("");
 
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon")
            .then((res) =>  res.json())
            .then ((data) => setPokemon(data.results))
            .catch((err)  => console.log(err) )
    },[]);

//this func is used to filter array 
// const filteredPokemon = pokemon.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
// );

// combining filter + sort together before rendering the table.

//Creates copy of state array to avoid mutating React state directly.
const filteredPokemon = [...pokemon]
.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
.sort((a,b) => {
    if(sortOrder === "asc") {
        return a.name.localeCompare(b.name)
    } else {
        return b.name.localeCompare(a.name)
    }
});

// delete the row in a table
const handleDelete = (name) => {
const isConfirm = window.confirm("Are you sure to delete ");
   if (isConfirm) {
    setPokemon(pokemon.filter((p) => p.name !== name));
  } 
}

const confirmDelete = () => {
  setPokemon(pokemon.filter(p => p.name !== selectedPokemon));
  setShowConfirm(false);
};

const cancelDelete = () => {
    setShowConfirm(false);
}

//sorted order list A-Z
// const sortedPokemon = [...pokemon].sort((a, b) =>
//   a.name.localeCompare(b.name)
// );

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(102, 38, 145, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  popup: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    spacing:"10px"
  }
};
return ( 
<>

<div>
    <h1 style={{color: "red"}}>Pokemon List</h1>
    <p> Serch for Pokemon Names and Filter. And also can delete pokemon if not required</p>
</div>
<input style={{padding:"10px"}} type= "text" placeholder= 'Search Pokemon Name' value= {search}  onChange={(e) => setSearch(e.target.value)}/>

{/* creating sort button  */}

<button onClick ={() => setSortOrder (sortOrder === "asc" ? "desc" :"asc")}> Sort: --- {sortOrder.toUpperCase()}</button>
<table style={{ borderCollapse: "collapse" , border: "2px solid black"}}>
 <thead border = "1" >

        <tr>
           <th>index</th>
           <th>Name</th>
           <th>url</th>
        </tr>
    </thead>
     
    <tbody>
        { filteredPokemon.length > 0  ? (filteredPokemon.map((p, index) => (
    <tr key={p.name}>
        <td style= {{border: "1px solid black"  }}>
            {index + 1}
        </td>
        <td style= {{border: "1px solid black"  }}>
            {p.name}
        </td>
        <td style= {{border: "1px solid black"}}  >
            {p.url}
        </td>

        <td style= {{border: "1px solid black"  }}>
            {/* <button onClick={() => handleDelete(p.name)}>
                DELETE ROW
            </button> */}

            <button style={{ color: "white", backgroundColor: "green"}} onClick={() => {
                setSelectedPokemon(p.name);
                setShowConfirm(true);
            }}>Delete</button>
        </td>

        {console.log('selectedPokemon', selectedPokemon)}

        {showConfirm && (
        <div style={styles.overlay}>
            <div style={styles.popup}>
            <p>Are you sure to delete :{selectedPokemon}</p>
            <button style={{ color: "white", backgroundColor: "green", spacing: "10px", marginRight: "10px"}} onClick={confirmDelete}>Yes</button> 
            <button style={{color: "white",backgroundColor: "red"}}onClick={cancelDelete}>No</button>
            </div>
        </div>
)}
    </tr>
   
))) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" , color: "red" , padding: '10px'}}>
                No Pokemon found
              </td>
            </tr>
          )}
    </tbody> 
    </table>
</>
);
}

export default PokemonList;