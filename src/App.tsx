import { Outlet } from "react-router-dom";
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import classes from './App.module.css'

function App() {
  return (
    <div className={classes.app}>
      <ThemeToggle />
      <h1>GitHub Finder</h1>
      <Outlet />
    </div>
  )
}

export default App
