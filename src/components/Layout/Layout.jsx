"use client";
import MainHeader from "../MainHeader/MainHeader";
import TopHeader from "../TopHeader/TopHeader";
import ReusableDialog from "../ui/ReusableDialog/ReusableDialog";
import { ReusableSnackbar } from "../ui/ReusableSnackbar/ReusableSnackbar";
import ReuseableDrawer from "../ui/ReuseableDrawer/ReuseableDrawer";

const Layout = ({ children }) => {
  return (
    <>
      <TopHeader />
      <MainHeader />
      <ReusableDialog />
      <ReuseableDrawer />
      <ReusableSnackbar />
      {children}
    </>
  );
};

export default Layout;
