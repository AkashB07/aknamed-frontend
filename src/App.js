import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import User from "./component/User/User";
import Details from "./component/Details/Details";

const App = () =>  {
  const submit = useSelector((state) => state.user.submit);
  
  return (
    <Routes>
      <Route path="/*" element={<User/>}/>
      <Route path="/details" element={submit ? <Details/> : <Navigate to="/" />}/>     
    </Routes>
  );
}

export default App;  
