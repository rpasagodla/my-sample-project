import {useState, useEffect} from 'react';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [sortOrder,setSortOrder] = useState("asc");
    const [showConfirm, setShowConfirm] = useState(false);
const [selectedPokemon, setSelectedPokemon] = useState(null);

 
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon")
            .then((res) =>  res.json())
            .then ((data) => setPokemon(data.results))
            .catch((err)  => console.log(err) )
    },[]);


//sorting pokemon list order from A-Z and Z-A
// const sortedOrderList = () => {
//     if(sortOrder == 'asc') {
//         return a.name.localeCompare(b.name);
//     } else {
//         return b.name.localeCompare(a.name);

//     }
// }

const handleDelete = (name) => {
const isConfirm = window.confirm("Are you sure");
   if (isConfirm) {
    setPokemon(pokemon.filter((p) => p.name !== name));
  } 
}

// const confirmDelete = () => {
//   setPokemon(pokemon.filter(p => p.name !== name));
//   setShowConfirm(false);
// };
const sortedPokemon = [...pokemon].sort((a, b) =>
  a.name.localeCompare(b.name)
);

return ( 
<table style={{ borderCollapse: "collapse", width: "50%",border: "1px solid red"  }}>
    <thead border = "1" >
        <tr>
           <th>index</th>
           <th>Name</th>
           <th>url</th>
        </tr>
    </thead>
     
    <tbody>
        { sortedPokemon
        .map((p, index) => (

    <tr >
        <td style= {{border: "1px solid black"  }}>
            {index}
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

            {/* <button onClick={confirmDelete}>
  Delete
</button> */}
        </td>
    </tr>
   
))}
    </tbody> 
    </table>
);
}

export default PokemonList;