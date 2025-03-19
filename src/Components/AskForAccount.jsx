import PromptCard from "./PromptCard";
export default function AskForAccont({ isLoggedIn }) {
  if (!isLoggedIn)
    return (
      <PromptCard
        prompt="Do you have an account?"
        buttons={[
          {
            content: "Yes",
            onClick: () => {
              alert("go to login");
            },
          },
          {
            content: "No",
            onClick: () => {
              alert("go to signup");
            },
          },
        ]}
      />
    );
}
