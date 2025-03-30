import { useParams } from "react-router-dom";
import ConventionCard from "./ConventionCard";
import { useConsObject } from "../utils/useCons.js";
import Loading from "./Loading.jsx";

export default function ViewConInfo() {
  const [cons, loading] = useConsObject();
  const params = useParams();
  const id = params.id;
  if (loading) return <Loading />;
  return <ConventionCard con={cons[id]} />;
}
