"use client"

import { createContext, useContext, useState } from "react"

const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState(null)
  const [title, setTitle] = useState("")
  const [anchor, setAnchor] = useState("bottom")

  const showDrawer = (content, title = "", anchor = "bottom") => {
    setContent(content)
    setTitle(title)
    setAnchor(anchor)
    setIsOpen(true)
  }

  const hideDrawer = () => {
    setIsOpen(false)
    // Clear content after animation completes
    setTimeout(() => {
      setContent(null)
      setTitle("")
      setAnchor("bottom")
    }, 300)
  }

  const value = {
    isOpen,
    content,
    title,
    anchor,
    showDrawer,
    hideDrawer,
  }

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}

export const useDrawerContext = () => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider")
  }
  return context
}
