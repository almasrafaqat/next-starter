import { useDispatch, useSelector } from "react-redux";
import { showAlert, hideAlert, resetAlert } from "@/store/slices/alertSlice";

export const useAlert = () => {
  const dispatch = useDispatch();
  const alertState = useSelector((state) => state.alert);

  const openAlert = (
    message,
    severity = "info"
  ) => {
    dispatch(showAlert({ message, severity }));
  };

  const closeAlert = () => {
    dispatch(hideAlert());
  };

  const clearAlert = () => {
    dispatch(resetAlert());
  };

  return {
    ...alertState,
    openAlert,
    closeAlert,
    clearAlert,
  };
};

