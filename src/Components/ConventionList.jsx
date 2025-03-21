import { useEffect, useState } from "react";

export default function ConventionList() {
  const [conventions, setConventions] = useState([]);
  useEffect(() => {
    fetch("localhost:3000/conventions/all")
      .then((res) => res.json())
      .then((res) => setConventions([res]));
  });
  return (
    <ul>
      {conventions.map((convention, i) => (
        <li key={i}>{convention}</li>
      ))}
    </ul>
  );
}
