import { supabase } from "../main";

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

  if (error) console.log(error);
  if (data[0]?.username.toLowerCase() === name.toLowerCase()) {
    return true;
  } else {
    return false;
  }
  // setIsTyping(false);
}

export async function checkIsEmailTaken(email) {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .ilike("email", email);

  if (error) console.log(error);
  if (data[0]?.email.toLowerCase() === email.toLowerCase()) return true;
  return false;

  // setIsTyping(false);
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
  window.location.reload();
}

export async function sendResetPasswordLink(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error("Failed to send reset link", error);
  if (data) {
    alert("A link to reset your password has been sent to your email");
  }
}

export async function resetPassword() {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event == "PASSWORD_RECOVERY") {
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
