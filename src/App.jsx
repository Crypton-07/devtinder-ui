import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<>Profile Page</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
