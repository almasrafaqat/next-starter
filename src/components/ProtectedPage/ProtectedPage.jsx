"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { CircularProgress, Box } from "@mui/material";
import FullSpinner from "../FullSpinner/FullSpinner";

export const ProtectedPage = ({ children }) => {
  const { status } = useAuth();

  if (status === "loading") {
    return (
      <FullSpinner />
    );
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null;
};
