import { useEffect, useState } from "react";
import ConventionCard from "./ConventionCard";

export default function ConventionList() {
  const [conventions, setConventions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/conventions/all")
      .then((res) => res.json())
      .then((res) => setConventions(res));
  }, []);

  return (
    <ul id="convention-list">
      {conventions.map((con, i) => (
        <ConventionCard con={con} key={i} />
      ))}
    </ul>
  );
}
