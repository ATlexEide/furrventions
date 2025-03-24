import { useSupabase } from "../SupabaseHook";
import { useUser } from "@clerk/clerk-react";

export default function AddConvention() {
  const { user } = useUser();
  const supabase = useSupabase();
  async function addConvention(obj) {
    const { data, error } = await supabase
      .from("conventions")
      .insert(obj)
      .select();
    if (error) console.log(error);
    console.log(data);
  }
  return (
    <button
      onClick={() => {
        addConvention({
          name: "TEST NAME",
          description: "TEST DESC",
          organizerID: user.id,
        });
      }}
    >
      Add Demo
    </button>
  );
}
