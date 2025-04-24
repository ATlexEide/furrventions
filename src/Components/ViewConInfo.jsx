import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewConInfo({ supabase }) {
  const navigate = useNavigate();
  const params = useParams();
  const con_id = params.id;
  const [submitter, setSubmitter] = useState();
  console.log(id);
  const [con, setCon] = useState({});

  async function fetchCon(id) {
    const { data, error } = await supabase
      .from("conventions")
      .select()
      .eq("id", id);
    if (error) throw new Error("Fetching convention failed");
    console.log(data);
    setCon(data[0]);
  }
  async function fetchConSubmitter(id) {
    const { data, error } = await supabase
      .from("users")
      .select("furname")
      .eq("id", id);
    if (error) throw new Error("Fetching submitter failed");
    console.log(data);
    setCon(data[0]);
  }

  if (con) console.log(con);

  useEffect(() => {
    if (!id) return;
    fetchCon(id);
  }, []);
  // const [cons, loading] = useConsObject();

  return (
    <article>
      <button
        className="nav-button"
        onClick={() => {
          navigate("/conventions");
        }}
      >
        🢀
      </button>
      <h1>{con.name}</h1>
      <p>{con.description}</p>
      <p></p>
    </article>
  );
}
