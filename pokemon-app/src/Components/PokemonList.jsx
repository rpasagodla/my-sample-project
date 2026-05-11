import {useState, useEffect} from 'react';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    // adding search filter
    const [search, setSearch] = useState("");
 
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon")
            .then((res) =>  res.json())
            .then ((data) => setPokemon(data.results))
            .catch((err)  => console.log(err) )
    },[]);


const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
);

const handleDelete = (name) => {
const isConfirm = window.confirm("Are you sure");
   if (isConfirm) {
    setPokemon(pokemon.filter((p) => p.name !== name));
  } 
}

const confirmDelete = () => {
  setPokemon(pokemon.filter(p => p.name !== name));
  setShowConfirm(false);
};

const cancelDelete = () => {
    setShowConfirm(false);
}

//sorted order list A-Z
const sortedPokemon = [...pokemon].sort((a, b) =>
  a.name.localeCompare(b.name)
);

return ( 
<>
<input type= "text" placeholder=' Enter name' value= {search}  onChange={(e) => setSearch(e.target.value)}/>
<table style={{ borderCollapse: "collapse", width: "50%",border: "1px solid red"  }}>
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
        <td style= {{border: "1px solid black"  }}  >
            {p.url}
        </td>
        <td>
            <button onClick={() => handleDelete(p.name)}>
                DELETEEE ROW
            </button>

            {/* <button onClick={confirmDelete}> Delete</button> */}

            {/* <button onClick={() => {setSelectedPokemon(p.name);
                setShowConfirm(true);
            }}>DELL</button> */}

            {/* <p>Are you sure</p>

            <button onClick={confirmDelete}>YES</button>
            <button onClick={cancelDelete}>NOO</button>  */}
        </td>
    </tr>
   
))) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" , color: "red" , padding: '10px'}}>
                No Pokémon found
              </td>
            </tr>
          )}
    </tbody> 
    </table>
</>
);

}

export default PokemonList;