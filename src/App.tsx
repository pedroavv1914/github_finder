import { Outlet } from "react-router-dom";
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { GlassCard } from './components/GlassCard/GlassCard';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.app}>
      <ThemeToggle />
      <GlassCard>
        <div className={classes.highlightContainer}>
          <h1>GitHub Finder</h1>
        </div>
      </GlassCard>
      <Outlet />
    </div>
  );
}

export default App;
