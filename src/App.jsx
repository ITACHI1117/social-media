import { useState } from "react";
import { BrowserRouter } from "react-router";
import "./App.css";

// import "./App.css";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  const screenSize = window.innerWidth;
  console.log(screenSize);

  return (
    <>
      {screenSize >= 600 ? (
        <section>
          <div>
            <h1>This site is best viewed on Mobile</h1>
          </div>
        </section>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
