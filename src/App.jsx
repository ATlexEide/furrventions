"use client";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
// import { useUser } from "@clerk/clerk-react";
import { useEffect /*useContext*/ } from "react";
import { useNavigate } from "react-router-dom";
// import { SupabaseContext } from "./SupabaseContext";

export default function Home() {
  const navigate = useNavigate();
  // const { supabase } = useContext(SupabaseContext);
  // const { user } = useUser();
  // async function taskTest() {
  //   console.log("YIPP");
  //   const { data, error } = await supabase
  //     .from("tasks")
  //     .insert({ name: "IM STUPID", user_id: user.id })
  //     .select();
  //   if (error) console.log(error);
  //   console.log(data);
  //   return data;
  // }
  // async function fetchConventions() {
  //   const { data, error } = await supabase.from("conventions").select();
  //   if (error) console.log(error);
  //   console.log(data);
  //   return data;
  // }

  useEffect(() => {
    // fetchConventions();
  }, []);
  return (
    <>
      <SignedIn>
        <h1>SIGNED IN</h1>
        <button onClick={() => navigate("conventions")}>Test</button>
      </SignedIn>
      <SignedOut>
        <h1>Please log in to access site</h1>
      </SignedOut>
    </>
  );
}
