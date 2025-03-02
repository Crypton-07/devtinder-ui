import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/login" element={<>Login Page</>} />
            <Route path="/profile" element={<>Profile Page</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
