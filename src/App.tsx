// Components
// import Game from "./components/game/Game";
// import Status from "./components/status/Status";

import Header from "./components/header/Header";
import Index from "./components/index/Index";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Index />
      </div>
    </div>
  );
}

export default App;
