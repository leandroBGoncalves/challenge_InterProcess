import { useEffect, useState } from 'react';
import '../src/styles/global.scss'
import { HeaderPatientList } from './components/header';
import { DashBoardList } from './components/listBody';

function App() {
  const [dados, setDados] = useState([]);
  const [search, setSearch] = useState('');
  const getLocal = () => {
      let localStorage = window.localStorage.getItem('patient')
      let parseLocal = JSON.parse(localStorage)
      setDados(parseLocal)
  }

  const  handleSearch = dados.filter((body) => {
      return body.name
      .toLowerCase()
      .includes(search.toLocaleLowerCase())  
  })

  useEffect(() => {
      getLocal()
  }, [])

  return (
    <>
      <HeaderPatientList setSearch={setSearch}/>
      <DashBoardList dados={handleSearch} getLocal={getLocal}/>
    </>
  );
}

export default App;
