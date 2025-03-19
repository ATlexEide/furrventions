import PromptCard from "./PromptCard";
export default function AskForAccont({ isLoggedIn }) {
  if (!isLoggedIn)
    return (
      <PromptCard
        prompt="TEST PROMT"
        buttons={[
          {
            content: "test",
            onClick: () => {
              alert("test");
            },
          },
        ]}
      />
    );
}
