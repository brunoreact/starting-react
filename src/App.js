import './App.css';
import pokemon from './pokemon.json';
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';

const PokemmonRow = ({ pkm, onSelect }) => (
  <tr>
    <td>{pkm.name.english}</td>
    <td>{pkm.type.join(", ")}</td>
    <td><button onClick={() => onSelect(pkm)}>Click</button></td>
  </tr>
);

PokemmonRow.propTypes = { // careful lower case here, upper below!!!
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
  onSelect: PropTypes.func,
};

function App() {
  const [filter, filterSet] = useState('');
  const [selectedItem, selectedItemSet] = useState('');

  return (
    <div style={{ margin: "auto", width: 800, padding: "1rem" }}>
      <h1 className='title'>Fuck YEAH!</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "70% 30%",
        gridColumnGap: "1rem"
      }}
      >
        <div>
          <input
            value={filter}
            onChange={(e) => filterSet(e.target.value)}
          />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((p) => p.name.english.toLowerCase().includes(filter.toLowerCase()))
                .slice(0, 20)
                .map((p) => (
                  <PokemmonRow pkm={p} key={p.id} onSelect={(p) => selectedItemSet(p)} />
                ))}

            </tbody>
          </table>
        </div>
        {selectedItem && (
          <h2>{selectedItem.name.english}</h2>
        )

        }
      </div>
    </div>
  );
}

export default App;
