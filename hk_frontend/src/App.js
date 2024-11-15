import {BrowserRouter,Routes,Route} from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Header from "./pages/Header";

function App() {

  return (
      <BrowserRouter>
          <Header/>
        <Routes>

          <Route path="/" element={<Mainpage/>}/>






        </Routes>


      </BrowserRouter>


  );

}

export default App