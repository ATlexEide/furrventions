import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewConInfo({ supabase }) {
  const navigate = useNavigate();
  const params = useParams();
  const con_id = params.id;
  const [submitter, setSubmitter] = useState("");
  console.log(con_id);
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
    console.clear();
    console.log(con);
    console.log("user id", id);
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("user_id", id);

    if (error)
      throw new Error(`Fetching submitter failed | Code: ${error.code}
    Message: ${error.message}
    Hint: ${error.hint}`);
    // if (data) setSubmitter(data[0]);
    console.log("data", data);
    if (data) setSubmitter(data[0].username);
  }

  if (con) console.log(con);
  if (submitter) console.log("submitter", submitter);

  useEffect(() => {
    if (!con_id) return;
    if (!con.id) fetchCon(con_id);
    console.log(con);
    if (con) fetchConSubmitter(con.creatorID);
  }, [con]);
  // const [cons, loading] = useConsObject();

  return (
    <article>
      <button
        className="nav-button"
        onClick={() => {
          navigate("/conventions");
        }}
      >
        ←
      </button>
      <h1>{con.name}</h1>
      <p>{con.description}</p>
      {submitter && <p>{submitter}</p>}
    </article>
  );
}
