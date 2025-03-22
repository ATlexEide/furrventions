import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ManageConventions() {
  const params = useParams();

  const [conventions, setConventions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currCon, setCurrCon] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/organizer/${params.id}/conventions`)
      .then((res) => res.json())
      //   .then((res) => console.log(res))
      .then((res) => setConventions(res));
  }, []);
  return (
    <>
      {/* CREATE NEW CONVENTION AND SET ORGANIZERID TO CURRENT USER */}
      {!isEditing && (
        <>
          <button>Register convention</button>
          <ul>
            {/* MAP OUT ALL CONVENTIONS WHERE ORGANIZER ID IS SAME AS CURRENT USERS ID */}
            {console.log(conventions)}
            {conventions.map((con, i) => (
              <li
                onClick={() => {
                  setCurrCon(con);
                  setIsEditing(true);
                }}
                key={i}
              >
                {con.convention_name}
              </li>
            ))}
          </ul>
        </>
      )}
      {/* TODO: Make this editing page thing shit */}
      {isEditing && (
        <>
          <button
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Back
          </button>
          <h1>{currCon.convention_name}</h1>
        </>
      )}
    </>
  );
}
