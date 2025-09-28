"use client"

import { createContext, useContext, useCallback, useState } from "react"

const DialogContext = createContext()

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [dialogChildren, setDialogChildren] = useState(null)
  const [layout, setLayout] = useState("default")
  const [style, setStyle] = useState({})
  const [actions, setActions] = useState(null)
  const [onClose, setOnClose] = useState(null)
  const [type, setType] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [persistent, setPersistent] = useState(false)
  const [validation, setValidation] = useState(null)
  const [metadata, setMetadata] = useState({})

  const openDialog = useCallback((options = {}) => {
    const {
      title: dialogTitle = "",
      content: dialogContent = "",
      children: dialogChildrenProp = null,
      layout: dialogLayout = "default",
      style: dialogStyle = {},
      size = "medium",
      variant = "standard",
      animation = "fade",
      backdrop = true,
      persistent: dialogPersistent = false,
      fullScreen = false,
      maxWidth = "sm",
      actions: dialogActions = null,
      onClose: dialogOnClose = null,
      className = "",
      headerProps = {},
      contentProps = {},
      footerProps = {},
      disableEscapeKeyDown = false,
      disableBackdropClick = false,
      keepMounted = false,
      scroll = "paper",
      TransitionComponent = null,
      transitionDuration = 300,
      elevation = 24,
      borderRadius = "default",
      padding = "default",
      gap = "default",
      type: dialogType = null,
      inputValue: dialogInputValue = "",
      defaultValue = "",
      validation: dialogValidation = null,
      metadata: dialogMetadata = {},
    } = options

    setOpen(true)
    setTitle(dialogTitle)
    setContent(dialogContent)
    setDialogChildren(dialogChildrenProp)
    setLayout(dialogLayout)
    setStyle({
      ...dialogStyle,
      size,
      variant,
      animation,
      backdrop,
      persistent: dialogPersistent,
      fullScreen,
      maxWidth,
      className,
      headerProps,
      contentProps,
      footerProps,
      disableEscapeKeyDown,
      disableBackdropClick,
      keepMounted,
      scroll,
      TransitionComponent,
      transitionDuration,
      elevation,
      borderRadius,
      padding,
      gap,
    })
    setActions(dialogActions)
    setOnClose(() => dialogOnClose)
    setType(dialogType)
    setInputValue(dialogInputValue || defaultValue)
    setValidation(() => dialogValidation)
    setMetadata(dialogMetadata)
    setPersistent(dialogPersistent)
  }, [])

  const closeDialog = useCallback(
    (callback) => {
      if (onClose && typeof onClose === "function") {
        onClose()
      }

      // Reset all state to initial values
      setOpen(false)
      setTitle("")
      setContent("")
      setDialogChildren(null)
      setLayout("default")
      setStyle({})
      setActions(null)
      setOnClose(null)
      setType(null)
      setInputValue("")
      setLoading(false)
      setPersistent(false)
      setValidation(null)
      setMetadata({})

      if (callback && typeof callback === "function") {
        setTimeout(callback, 300) // Wait for animation
      }
    },
    [onClose],
  )

  const updateInput = useCallback((value) => {
    setInputValue(value)
  }, [])

  // Quick dialog presets for common use cases
  const confirm = useCallback(
    (options = {}) => {
      const {
        title = "Confirm Action",
        message = "Are you sure you want to proceed?",
        content = message,
        confirmText = "Confirm",
        cancelText = "Cancel",
        onConfirm = () => {},
        onCancel = () => {},
        variant = "warning",
        type = "warning",
        severity = variant,
        ...rest
      } = options

      const handleConfirm = () => {
        if (typeof onConfirm === "function") {
          onConfirm()
        }
        closeDialog()
      }

      const handleCancel = () => {
        if (typeof onCancel === "function") {
          onCancel()
        }
        closeDialog()
      }

      openDialog({
        title,
        content,
        layout: "confirm",
        type: type || severity,
        actions: {
          confirm: {
            text: confirmText,
            action: handleConfirm,
            variant: "contained",
            color: severity === "error" ? "error" : "primary",
          },
          cancel: {
            text: cancelText,
            action: handleCancel,
            variant: "outlined",
          },
        },
        ...rest,
      })
    },
    [openDialog, closeDialog],
  )

  const alert = useCallback(
    (options = {}) => {
      const {
        title = "Alert",
        message = "",
        content = message,
        buttonText = "OK",
        onClose = () => {},
        variant = "info",
        type = "info",
        ...rest
      } = options

      const handleClose = () => {
        if (typeof onClose === "function") {
          onClose()
        }
        closeDialog()
      }

      openDialog({
        title,
        content,
        layout: "alert",
        type,
        actions: {
          ok: {
            text: buttonText,
            action: handleClose,
            variant: "contained",
          },
        },
        ...rest,
      })
    },
    [openDialog, closeDialog],
  )

  const prompt = useCallback(
    (options = {}) => {
      const {
        title = "Input Required",
        message = "",
        content = message,
        placeholder = "",
        defaultValue = "",
        onConfirm = () => {},
        onCancel = () => {},
        inputType = "text",
        validation = null,
        submitText = "Submit",
        cancelText = "Cancel",
        ...rest
      } = options

      const handleSubmit = () => {
        const currentValue = inputValue

        if (validation && typeof validation === "function") {
          const isValid = validation(currentValue)
          if (!isValid) return
        }

        if (typeof onConfirm === "function") {
          onConfirm(currentValue)
        }
        closeDialog()
      }

      const handleCancel = () => {
        if (typeof onCancel === "function") {
          onCancel()
        }
        closeDialog()
      }

      openDialog({
        title,
        content,
        children: null,
        layout: "prompt",
        inputValue: defaultValue,
        validation,
        actions: {
          confirm: {
            text: submitText,
            action: handleSubmit,
            variant: "contained",
          },
          cancel: {
            text: cancelText,
            action: handleCancel,
            variant: "outlined",
          },
        },
        style: {
          inputProps: {
            placeholder,
            type: inputType,
          },
        },
        ...rest,
      })
    },
    [openDialog, closeDialog, inputValue],
  )

  const componentLayout = useCallback(
    (options = {}) => {
      console.log("componentLayout options", options)
      const {
        title = "",
        component = null,
        children = component,
        content = children,
        actions = null,
        onClose = () => {},
        maxWidth = "lg",
        size = "large",
        ...rest
      } = options

      const handleClose = () => {
        if (typeof onClose === "function") {
          onClose()
        }
        closeDialog()
      }

      openDialog({
        title,
        content,
        children,
        layout: "component",
        maxWidth,
        size,
        actions: actions || {
          close: {
            text: "Close",
            action: handleClose,
            variant: "outlined",
          },
        },
        onClose: handleClose,
        ...rest,
      })
    },
    [openDialog, closeDialog],
  )

  const loadingDialog = useCallback(
    (options = {}) => {
      const {
        title = "Loading...",
        message = "Please wait while we process your request.",
        content = message,
        ...rest
      } = options

      openDialog({
        title,
        content,
        layout: "loading",
        persistent: true,
        disableEscapeKeyDown: true,
        disableBackdropClick: true,
        ...rest,
      })
    },
    [openDialog],
  )

  const value = {
    // State
    isOpen: open,
    title,
    content,
    children: dialogChildren,
    style,
    layout,
    actions,
    type,
    inputValue,
    loading,
    persistent,
    validation,
    metadata,

    // Actions
    open: openDialog,
    close: closeDialog,
    updateInputValue: updateInput,
    setLoading,
    updateDialog: (updates) => {
      if (updates.title !== undefined) setTitle(updates.title)
      if (updates.content !== undefined) setContent(updates.content)
      if (updates.children !== undefined) setDialogChildren(updates.children)
      if (updates.style !== undefined) setStyle((prev) => ({ ...prev, ...updates.style }))
      if (updates.actions !== undefined) setActions(updates.actions)
      if (updates.type !== undefined) setType(updates.type)
      if (updates.inputValue !== undefined) setInputValue(updates.inputValue)
      if (updates.loading !== undefined) setLoading(updates.loading)
      if (updates.persistent !== undefined) setPersistent(updates.persistent)
      if (updates.validation !== undefined) setValidation(() => updates.validation)
      if (updates.metadata !== undefined) setMetadata(updates.metadata)
    },
    setActions,

    // Presets
    confirm,
    alert,
    prompt,
    loading: loadingDialog,
    componentLayout,

    // Utilities
    toggle: () => (open ? closeDialog() : openDialog()),
    isLayout: (layoutType) => layout === layoutType,
    isType: (typeCheck) => type === typeCheck,
    hasActions: () => actions !== null,
    isLoading: () => loading,
  }

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
}

export const useDialogContext = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}

