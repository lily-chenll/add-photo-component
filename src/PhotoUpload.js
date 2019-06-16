import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Add from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  input: {
    display: "none"
  },
  button: {
    marginTop: theme.spacing(4),
    position: "relative",
    width: "100%",
    height: 150,
    overflow: "hidden",
    borderRadius: 4,
    border: "1px dashed #cad1d8",
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      }
    }
  },
  errorBorder: {
    border: `1px solid ${theme.palette.error.main}`
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#81868f"
  },
  uploadedTextColor: {
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    width: "100%"
  },
  imageBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  }
}));

function PhotoUpload({ addMore, onChange, file, error }) {
  const classes = useStyles();
  const photoUrl = file ? URL.createObjectURL(file) : "";
  const [url, setUrl] = useState(photoUrl);

  const handleClick = event => {
    const fileList = event.target.files;
    if (fileList.length) {
      const photoFile = fileList[0];
      if (url) {
        URL.revokeObjectURL(url);
      }
      setUrl(URL.createObjectURL(photoFile));
      onChange(photoFile);
    }
  };

  const renderAddButton = () => {
    return (
      <span className={classes.imageButton}>
        <Add style={{ fontSize: 24 }} />
        <Typography style={{ fontSize: 11 }}>Add more...</Typography>
      </span>
    );
  };

  const renderUploadButton = () => {
    return (
      <React.Fragment>
        {!!url && (
          <React.Fragment>
            <img alt="receipt" className={classes.imageSrc} src={url} />
            <span className={classes.imageBackdrop} />
          </React.Fragment>
        )}
        <span
          className={classNames(
            classes.imageButton,
            !!url && classes.uploadedTextColor
          )}
        >
          <PhotoCamera style={{ fontSize: 24 }} />
          <Typography style={{ fontSize: 11 }}>
            {url ? "Reupload Photo" : "Upload Photo"}
          </Typography>
        </span>
      </React.Fragment>
    );
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
    <label>
      <input
        accept="image/*"
        className={classes.input}
        type="file"
        onChange={handleClick}
      />
      <ButtonBase
        component="span"
        focusRipple
        focusVisibleClassName={classes.focusVisible}
        className={classNames(classes.button, error && classes.errorBorder)}
      >
        {addMore ? renderAddButton() : renderUploadButton()}
      </ButtonBase>
    </label>
  );
}

PhotoUpload.defaultProps = {
  addMore: false,
  file: null,
  error: false
};

PhotoUpload.propTypes = {
  addMore: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  file: PropTypes.object,
  error: PropTypes.bool
};

export default PhotoUpload;
