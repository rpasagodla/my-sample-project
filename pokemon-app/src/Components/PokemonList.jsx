import {useState, useEffect} from 'react';


const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon")
            .then((res) =>  res.json())
            .then ((data) => setPokemon(data.results))
            .catch((err)  => console.log(err) )
    },[]);



const handleDelete = (name) => {
  const updatedList = pokemon.filter((p) => p.name !== name);
  setPokemon(updatedList);
};


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
        { pokemon
        .slice()
        .sort((a,b )=> a.name.localeCompare((b.name)))
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
        </td>
    </tr>

    
))}
    </tbody> 
    </table>
);
}

export default PokemonList;