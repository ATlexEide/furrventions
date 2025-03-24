import { useState } from "react";
import AskForAccont from "./Components/AskForAccount";

import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) return <AskForAccont setIsLoggedIn={setIsLoggedIn} />;
  return <h1>test</h1>;
}
