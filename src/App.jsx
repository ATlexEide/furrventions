import { useState } from "react";
import AskForAccont from "./Components/AskForAccount";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (!isLoggedIn) return <AskForAccont />;
  return <h1>test</h1>;
}
