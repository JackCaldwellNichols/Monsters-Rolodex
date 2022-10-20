import { useState, useEffect} from 'react';

import CardList from './components/card-list/card-list.jsx'
import SearchBox from './components/search-box/search-box.jsx'
import './App.css';

const App = () => {
  const [searchField, SetSearchField] = useState('');
  const [monsters, setMonsters] = useState([])
  const [filterMonsters, setFilterMonsters] = useState(monsters);


  useEffect (()=> {
     fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())  
      .then((users) => setMonsters(users));

  }, [])


  useEffect (() => {
      const newFilterMonsters = monsters.filter((monster) =>{  
        return monster.name.toLowerCase().includes(searchField);
      });
        setFilterMonsters(newFilterMonsters);
  }, [monsters, searchField])

  const onSearchChange = (event) =>{
    const searchFieldString = event.target.value.toLowerCase();  
      SetSearchField(searchFieldString);
     };


  return (
     <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>

        <SearchBox 
        onChangeHandler={onSearchChange} 
        placeholder='search monsters' 
        className='monsters-search-box'
        />

        <CardList monsters={filterMonsters}/>
        
      </div>

    )
}

export default App;
