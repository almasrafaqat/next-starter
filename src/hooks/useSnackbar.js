import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar, incrementSnackbarProgressBy, showSnackbar, updateSnackbarProgress } from "@/store/slices/snackbarSlice";
import { useCallback } from "react";

export const SnackbarPositions = {
  TOP_CENTER: { vertical: "top", horizontal: "center" },
  TOP_RIGHT: { vertical: "top", horizontal: "right" },
  TOP_LEFT: { vertical: "top", horizontal: "left" },
  BOTTOM_CENTER: { vertical: "bottom", horizontal: "center" },
  BOTTOM_RIGHT: { vertical: "bottom", horizontal: "right" },
  BOTTOM_LEFT: { vertical: "bottom", horizontal: "left" },
};

export const useSnackbar = () => {
  const dispatch = useDispatch();
  const snackbarState = useSelector((state) => state.snackbar);

  const updateProgress = useCallback((newProgress) => {
    // Use dispatch instead of setSnackbarState
    dispatch(updateSnackbarProgress(newProgress));
  }, [dispatch]);

  const updateProgressByInc = useCallback((newProgress) => {
    // Use dispatch instead of setSnackbarState
    dispatch(incrementSnackbarProgressBy(newProgress));
  }, [dispatch]);



  const openSnackbar = (
    message,
    severity = "info",
    options = {}
  ) => {
    const {
      progress = null,
      showProgress = false,
      action = null,
      autoHideDuration = 6000,
      position = { vertical: "bottom", horizontal: "center" }
    } = options;

    dispatch(showSnackbar({
      message,
      severity,
      progress,
      showProgress,
      action,
      autoHideDuration: showProgress ? null : autoHideDuration,
      position
    }));
  };

  const closeSnackbar = () => {
    dispatch(hideSnackbar());
  };

  return {
    ...snackbarState,
    openSnackbar,
    closeSnackbar,
    updateProgress,
    updateProgressByInc
  };
};
