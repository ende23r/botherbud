import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import Grid from '@mui/material/Grid'; // Grid version 1
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Paper from '@mui/material/Paper';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      console.log({ data });
      const json = await data.json();
      console.log({ json });
    }
    fetchData();
  }, []);  // Run once on mount

  return (
    <Grid container spacing={1}>
      <Grid xs={8}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Grid>
      <Grid xs={4}><h1>Vite + React</h1></Grid>
      <Grid xs={4}>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </Grid>
      <Grid xs={8} className="read-the-docs">
        Click on the Vite and React logos to learn more
      </Grid>
      {/*temporarily setting this to 12 wide to get it on its own line*/}
      <Grid container xs={12}>
        <ChatLog />
      </Grid>
    </Grid>
  )
}

function ChatLog(props) {
  const {messages} = props;
  console.log({messages});
  return (
    <>
    <Grid xs={8}>
    <Paper>This is where my text will go!</Paper>
    </Grid>
    <Grid xs={4}><Paper>This can be a sidebar</Paper></Grid>
    </>
  );
}

export default App
