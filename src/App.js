import React, { useState, useEffect } from "react";
import Routes from "./components/Routes";
import Config from "./config";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [cart, setCart] = useState([]);
  const appProps = { isAuthenticated, userHasAuthenticated, cart, setCart };

  useEffect(() => {
    fetch(Config.serverUrl + "/checktoken", {
      credentials: "include",
    })
      .then((res) => {
        userHasAuthenticated(res.ok);
        setAuthenticating(false);
      })
      .catch((e) => {
        console.error(e);
        setAuthenticating(false);
      });
  }, []);

  return (
    <div className="App">
      {!isAuthenticating && <Routes appProps={appProps} />}
    </div>
  );
}

export default App;
