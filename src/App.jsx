// ✅ FIX: App.jsx is NOT used when main.jsx uses RouterProvider.
// This file is kept minimal. main.jsx is the real entry point.
// If you ever render <App /> directly (without router), this is the fallback.

import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;