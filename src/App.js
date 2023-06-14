import { Route, Routes } from "react-router-dom";

import User from "./component/User/User";
import Details from "./component/Details/Details";

const App = () =>  {
  
  return (
    <Routes>
      <Route path="/" element={<User/>}/>
      <Route path="/details" element={<Details/>}/>     
    </Routes>
  );
}

export default App;  
