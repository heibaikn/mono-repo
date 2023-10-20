import { useState } from "react";
import MonoConfig, { Project } from "@mono/config";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const getHost = ()=>{
    if(import.meta.env.MODE ==='development'){
      return MonoConfig.getHostBase(Project.React, import.meta.env.MODE);
    }else{
      return import.meta.url
    }
  }
  const host = getHost() 
  const img1 = new URL(reactLogo, host).href;
  const img2 = new URL(viteLogo, host).href;
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={img2} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={img1} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
