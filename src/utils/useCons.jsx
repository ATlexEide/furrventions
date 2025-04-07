// import { useEffect, useState } from "react";

// function useFetchCons() {
//   const supabase = useSupabase();
//   console.log("Fetching cons");
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(
//     localStorage.getItem("conventions")
//       ? JSON.parse(localStorage.getItem("conventions"))
//       : null
//   );
//   async function fetch() {
//     const { data, err } = await supabase.from("conventions").select();
//     if (err) throw new Error(err);
//     localStorage.setItem("conventions", JSON.stringify(data));
//     setData(data);
//     setLoading(false);
//   }
//   useEffect(() => {
//     if (data) return;
//     fetch();
//   }, []);
//   return [data, loading];
// }

// export function useConsArray() {
//   const [data, loading] = useFetchCons();
//   const [consArray, setConsArray] = useState(data);
//   useEffect(() => {
//     if (!data) return;
//     setConsArray(data);
//   }, [data]);
//   return [consArray, loading];
// }

// export function useConsObject() {
//   const [data, loading] = useFetchCons();
//   const [consObject, setConsObject] = useState(null);

//   function createConventionObject() {
//     if (!data) return;
//     let _consObject = {};
//     data.map((con) => {
//       _consObject[con.id] = con;
//     });
//     setConsObject(_consObject);
//   }

//   useEffect(() => {
//     createConventionObject();
//   }, [data]);

//   console.log(consObject);
//   return [consObject, loading];
// }
