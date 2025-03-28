import { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import ConventionList from "./ConventionList.jsx";
import { FetchCons } from "../utils/fetchCons.jsx";

export default function ViewCons() {
  const [loading, setLoading] = useState(true);

  if (!cons) return <Loading />;
  return (
    <section id="convention-list-cont">
      {loading && <Loading />}
      {!loading && <ConventionList setLoading={setLoading} />}
    </section>
  );
}
