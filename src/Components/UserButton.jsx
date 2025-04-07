import { useState } from "react";

export default function UserButton() {
  const [isOpen, setIsOpen] = useState();
  const _width = 200;
  return (
    <>
      {" "}
      <button
        style={{ width: `${_width}px` }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Manage profile
      </button>
      {isOpen && <h1>test</h1>}
    </>
  );
}
