import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import PhotoUpload from "./PhotoUpload";

function PhotoUploadList({ fileList, onChangeFiles, onAddFiles, showError }) {
  return (
    <Grid container spacing={1}>
      {!!fileList.length &&
        fileList.map((fileItem, index) => {
          return (
            <Grid item xs={12} sm={4} key={fileItem.name}>
              <PhotoUpload
                onChange={file => onChangeFiles(file, index)}
                file={fileItem}
              />
            </Grid>
          );
        })}
      <Grid item xs={12} sm={4}>
        <PhotoUpload
          addMore={!!fileList.length}
          error={showError}
          onChange={onAddFiles}
        />
      </Grid>
    </Grid>
  );
}

PhotoUploadList.propTypes = {
  onChangeFiles: PropTypes.func.isRequired,
  onAddFiles: PropTypes.func.isRequired,
  showError: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  fileList: PropTypes.array.isRequired
};

export default PhotoUploadList;
