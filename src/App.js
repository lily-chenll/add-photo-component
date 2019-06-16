import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import PhotoUploadList from "./PhotoUploadList";

function App() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  return (
    <div>
      <PhotoUploadList
        fileList={files}
        onAddFiles={file => {
          setFiles([...files, file]);
        }}
        onChangeFiles={(file, index) => {
          const newFiles = files;
          newFiles[index] = file;
          setFiles([...newFiles]);
        }}
        showError={error}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (!files.length) {
            setError(true);
            return;
          }
          setError(false);
          console.log(files);
          alert("Upload successfully");
        }}
      >
        Confirm
      </Button>
    </div>
  );
}

export default App;
