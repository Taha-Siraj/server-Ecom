import Fotter from './components/Fotter';
import Navbar from './components/Navbar';
import CustomRoutes from './Routes/CustomRoutes';
import axios from 'axios';

const App = () => {

  return (
    <>
    <Navbar/>
    <CustomRoutes/>
    <Fotter/>
    </>
  )
}

export default App
