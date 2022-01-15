import '../src/styles/global.scss'
import { HeaderPatientList } from './components/header';
import { DashBoardList } from './components/listBody';

function App() {
  return (
    <>
      <HeaderPatientList />
      <DashBoardList />
    </>
  );
}

export default App;
