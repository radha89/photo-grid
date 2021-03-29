import React from "react";
import { HeaderComponent } from "./component/Header/header-component";
import { PhotoGrid } from "./component/Photo-Grid/photo-grid";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderComponent />
        <PhotoGrid />
      </header>
    </div>
  );
}

export default App;
