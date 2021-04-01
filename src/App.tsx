import React from "react";
import { HeaderComponent } from "./component/Header/header-component";
import { FooterComponent } from "./component/Footer/footer-component";
import { PhotoGrid } from "./component/Photo-Grid/photo-grid.component";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderComponent />
        <PhotoGrid />
        <FooterComponent />
      </header>
    </div>
  );
}

export default App;
