import { Landing, Home, Form, Detail } from "./Views"
// import NavBar from "./Components/NavBar/NavBar"
import './App.css';
import {Route } from 'react-router-dom';
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import { getPokemons } from "./Redux/actions";

function App() {


  // const location = useLocation();

  return (
    <div className="App">
        {/* {location.pathname !== '/' && (<NavBar onSearch={getPokemons}/>)} */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/detail/:name" component={Detail}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/form" component={Form}/>

    </div>
  );
}

export default App;
