import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export async function getSession(setter) {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new error(error);
  }

  if (data) {
    setter(data.session);
  }
}

export async function signUpNewUser(tempUser) {
  const { data, error } = await supabase.auth.signUp({
    email: tempUser.email,
    password: tempUser.pw,
    options: {
      emailRedirectTo: "https://furrventions.com/",
      data: {
        first_name: tempUser.firstname,
        last_name: tempUser.lastname,
        furname: tempUser.furname
      }
    }
  });

  if (error)
    throw new Error(`Creating public user profile failed | Code: ${error.code}
    Message: ${error.message}
    Hint: ${error.hint}`);

  if (data.user) {
    createPublicProfile(data.user);
  }
}

async function createPublicProfile(user) {
  const { error } = await supabase.from("users").insert({
    username: user.user_metadata.furname,
    user_id: user.id,
    email: user.email
  });
  if (error) {
    throw new Error(`Creating public user profile failed | Code: ${error.code}
      Message: ${error.message}
      Hint: ${error.hint}`);
  }
  return true;
}

async function updatePublicProfile(updateObject) {
  console.log(updateObject);
  let payload = { user_id: updateObject.user_id };
  updateObject.email ? (payload.email = updateObject.email) : null;
  updateObject.username ? (payload.username = updateObject.username) : null;

  const { data, error } = await supabase
    .from("users")
    .update(payload)
    .eq("user_id", updateObject.user_id)
    .select();
  console.log(data);
  if (error) {
    console.log(error);
    throw new Error(`Creating public user profile failed | Code: ${error.code}
      Message: ${error.message}
      Hint: ${error.hint}`);
  }
  return true;
}

export async function fetchAndSetAllCons(supabase, setCons, setLoading) {
  const { data, err } = await supabase.from("conventions").select();
  if (err) throw new Error(err);
  // localStorage.setItem("conventions", JSON.stringify(data));
  setCons(data);
  setLoading(false);
}

export async function checkIsUsernameTaken(name) {
  const { data, error } = await supabase
    .from("users")
    .select("username")
    .ilike("username", name);

  if (error) {
    console.log(error);
    alert(error.message);
  }
  if (data[0]?.username.toLowerCase().trim() === name.toLowerCase().trim()) {
    return true;
  } else {
    return false;
  }
}

export async function checkIsEmailTaken(email) {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .ilike("email", email);

  if (error) console.log(error);
  if (data[0]?.email.toLowerCase() === email.toLowerCase()) return true;
  return false;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
  window.location.reload();
}

export async function sendResetPasswordLink(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    // redirectTo: "http://localhost:5173/reset-password"
    redirectTo: "https://www.furrventions.com/reset-password"
  });
  if (error) alert("Failed to send reset link, please try again soon");
  if (data) {
    alert("A link to reset your password has been sent to your email");
  }
}

export async function resetPassword() {
  // eslint-disable-next-line no-unused-vars
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      const newPassword = prompt(
        "What would you like your new password to be?"
      );
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (data) alert("Password updated successfully!");
      if (error) alert("There was an error updating your password.");
    }
  });
}

export async function getUserSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error("Getting user session failed", error);
  return data.session;
}

export async function updateUser(updateObject) {
  console.log("//////////////", updateObject, "//////////////");
  const email = updateObject.email;
  const furname = updateObject.data?.username;

  let payload = { email, data: {} };

  if (furname) payload.data.furname = furname;

  const { user, error } = await supabase.auth.updateUser(payload);
  if (error)
    switch (error.code) {
      case "email_exists":
        alert("The email is already in use");
        return;

      case "over_email_send_rate_limit":
        alert("Too many email updates, please wait");
        return;

      default:
        throw new Error(error);
    }
  if (user && email) {
    alert("Check your email to confirm change");
  }

  const publicUpdateObject = { user_id: updateObject.user_id };

  if (furname) publicUpdateObject.username = furname;
  if (email) publicUpdateObject.email = email;
  const message = `${
    furname && email
      ? "Username updated \n Check your emails for confirmation links"
      : furname
      ? "Username updated"
      : email
      ? "Check your emails for confirmation links"
      : null
  }`;
  if (await updatePublicProfile(publicUpdateObject)) {
    alert(message);
    // Return bool to refresh page if change is successful
    return true;
  } else return false;
}

export async function addParticipant(userId, conId) {
  const { error } = await supabase
    .from("participants")
    .insert({ conventionID: conId, userID: userId });

  if (error) alert("AAAAA");
  else alert("GREAT SUCCESS");
}

export async function fetchParticipantCons(participantId, setter) {
  console.log(participantId);
  const { data, error } = await supabase
    .from("participants")
    .select("conventionID, conventions(*)")
    .eq("userID", participantId);

  if (error) console.log(error);
  if (!setter) return data;
  setter(data);
}
