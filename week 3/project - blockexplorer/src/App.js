import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import LatestBlocks from "./LatestBlocks";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

function App() {

  return (
    <div className="App">
        <LatestBlocks />
    </div>
  );
}

export default App;
