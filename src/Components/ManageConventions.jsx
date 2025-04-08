import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ManageConventions({ supabase }) {
  const [test, setTest] = useState();
  const { id } = useParams();
  console.log("params id", id);

  // TODO: FIX being able to see other users events by changing url
  async function fetchUserConIds() {
    // .eq("userID", "5d735e16-8b63-46e1-8c39-0993d96b78b6");
    const { data, error } = await supabase
      .from("participants")
      .select(
        `
      conventions (
        *
      )
    `
      )
      .eq("userID", id);
    if (error) console.log(error);
    if (data) setTest(data);
  }
  useEffect(() => {
    if (!id) return;
    fetchUserConIds();
  }, [id]);

  console.log(test);

  return (
    <ul>
      {test && test.map((data, i) => <li key={i}>{data.conventions.name}</li>)}
    </ul>
  );
}
