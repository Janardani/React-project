

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bootstrapcomp from "./Bootstrap/Bootstrapcomp";
import { Csscomponent } from "./Css/Csscomponent";
import Html from "./Html/Html";
import Login from "./Pages/Login";
import Maincomponent from "./Pages/Maincomponent";
import Result from "./Pages/Result";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/maincomponent" element={<Maincomponent />} />
        <Route path="/html" element={<Html />} />
        <Route path="/css" element={<Csscomponent />} />
        <Route path="/bootstrap" element={<Bootstrapcomp />} />
        <Route path="/result" element={<Result />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
