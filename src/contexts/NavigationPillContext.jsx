'use client'
import { createContext, useContext, useState } from "react";

const NavigationPillContext = createContext()

export const NavigationPillProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [onHover, setOnHover] = useState(false);
   const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [actions, setActions] = useState(null);
  const [onClose, setOnClose] = useState(null);
  const [type, setType] = useState(null);
  const toggleOpen = () => setOpen((prev) => !prev);

  const value = {
    open,
    setOpen,
    expanded,
    setExpanded,
    onHover,
    setOnHover,
    toggleOpen,
    selected,
    setSelected,
    title,
    setTitle,
    content,
    setContent,
    actions,
    setActions,
    onClose,
    setOnClose,
    type,
    setType,
  };

  return (
    <NavigationPillContext.Provider value={value}>
      {children}
    </NavigationPillContext.Provider>
  );
};

export const useNavigationPill = () => {
  const context = useContext(NavigationPillContext);

  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

