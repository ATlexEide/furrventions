import PromptCard from "./PromptCard";
import { useNavigate } from "react-router-dom";
export default function AskForAccont({ isLoggedIn }) {
  const navigate = useNavigate();
  if (!isLoggedIn)
    return (
      <PromptCard
        prompt="Do you have an account?"
        buttons={[
          {
            content: "Yes",
            onClick: () => {
              navigate("/login");
            },
          },
          {
            content: "No",
            onClick: () => {
              navigate("/signup");
            },
          },
        ]}
      />
    );
}
