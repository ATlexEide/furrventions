import { useState } from "react";
import { uploadLogo } from "../utils/uploadLogo";

export default function Test({ supabase }) {
  const [file, setFile] = useState(null);

  return (
    <>
      <button>test</button>
      <input
        type="file"
        name="filepicker"
        id="filepicker"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      {file && (
        <button
          onClick={() => {
            uploadLogo(supabase, "test with space", file);
          }}
        >
          Upload
        </button>
      )}
    </>
  );
}
