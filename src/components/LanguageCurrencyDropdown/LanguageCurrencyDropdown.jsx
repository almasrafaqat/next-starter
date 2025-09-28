"use client"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocale, useTranslations } from "next-intl"
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Stack,
  InputAdornment,
  TextField,
} from "@mui/material"
import {
  Language as LanguageIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Public,
  Search as SearchIcon,
} from "@mui/icons-material"
import {
  setCurrency,
  setLanguage,
  selectCurrency,
  fetchExchangeRate,
  fetchCommonExchangeRates,
  storeLanguage,
} from "@/store/slices/currencySlice"

import {
  detectBrowserLanguage,
  usePathname,
  useRouter,
  locales
} from "@/i18n/routing"
import { currencies } from "@/utils/currencyUtils"
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice"
import { responsiveText } from "@/styles/globalStyles";

const LanguageCurrencyDropdown = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const { isRtl } = useResponsiveDevice()
  const [selectedLocale, setSelectedLocale] = useState(currentLocale)
  const { currency, status, exchangeRates } = useSelector(selectCurrency)
  const trans = useTranslations("translations")

  const language = useSelector(storeLanguage)

  const [open, setOpen] = useState(false)
  const [tempCurrency, setTempCurrency] = useState(currency)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCurrencyList, setShowCurrencyList] = useState(false)
  const anchorRef = React.useRef(null)

  useEffect(() => {
    const browserLang = detectBrowserLanguage()
    if (!localStorage.getItem("userSelectedLanguage")) {
      setSelectedLocale(browserLang)
      router.push(pathname, { locale: browserLang })
    }
  }, [pathname, router])

  useEffect(() => {
    setSelectedLocale(currentLocale)
  }, [currentLocale])

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCommonExchangeRates())
    }
  }, [dispatch, status])

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleLanguageChange = (event) => {
    const newLocale = event.target.value
    setSelectedLocale(newLocale)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setShowCurrencyList(true)
  }

  const handleCurrencySelect = (selectedCurrency) => {
    setTempCurrency(selectedCurrency)
    setShowCurrencyList(false)
    setSearchTerm(selectedCurrency)
  }

  const filteredCurrencies = currencies.filter(
    (curr) =>
      curr.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curr.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curr.locale.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSave = () => {
    // Apply language change
    setSelectedLocale(selectedLocale)
    dispatch(setLanguage(selectedLocale))
    localStorage.setItem("userSelectedLanguage", selectedLocale)
    router.push(pathname, { locale: selectedLocale })

    // Apply currency change
    if (tempCurrency !== currency) {
      const selectedCurrency = currencies.find((curr) => curr.currency === tempCurrency)
      if (selectedCurrency) {
        dispatch(setCurrency(selectedCurrency))
        if (selectedCurrency.currency !== "USD" && !exchangeRates[selectedCurrency.currency]) {
          dispatch(fetchExchangeRate(selectedCurrency.currency))
        }
      }
    }

    setOpen(false)
  }

  return (
    <>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        startIcon={<LanguageIcon />}
        endIcon={<ArrowDownIcon />}
        sx={{
          ...responsiveText,
          color: "primary.contrastText",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
          ...(isRtl && {
            "& .MuiButton-startIcon": {
              marginLeft: 1,
              marginRight: -0.5,
            },
            "& .MuiButton-endIcon": {
              marginRight: 1,
              marginLeft: -0.5,
            },
          }),
        }}
      >
        {language.toUpperCase()} | {currency}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        sx={{ zIndex: 1300, width: 320 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              elevation={3}
              sx={{
                mt: 1,
                p: 2,
                ...(isRtl && {
                  direction: "rtl",
                }),
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Stack spacing={2}>
                  {/* Language Section */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      {trans("topHeader.language")}
                    </Typography>
                    <FormControl component="fieldset" fullWidth>
                      <RadioGroup value={selectedLocale} onChange={handleLanguageChange}>
                        {locales.map((locale) => (
                          <FormControlLabel
                            key={locale}
                            value={locale}
                            control={<Radio size="small" />}
                            label={`${trans(`topHeader.languages.${locale}`)}-${locale.toUpperCase()}`}
                            sx={{
                              ...(isRtl && {
                                "& .MuiFormControlLabel-label": {
                                  marginLeft: 0,
                                  marginRight: 1,
                                },
                              }),
                            }}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Box>

                  <Divider />

                  {/* Currency Section */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      {trans("topHeader.currency")}
                    </Typography>
                    <Box sx={{ position: "relative" }}>
                      <TextField
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onClick={() => setShowCurrencyList(true)}
                        placeholder="Search currency"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          mb: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "4px",
                          },
                          ...(isRtl && {
                            "& .MuiInputAdornment-root": {
                              marginLeft: 0,
                              marginRight: -0.5,
                            },
                            "& .MuiOutlinedInput-input": {
                              textAlign: "right",
                            },
                          }),
                        }}
                      />
                      {showCurrencyList && (
                        <Paper
                          sx={{
                            position: "absolute",
                            width: "100%",
                            maxHeight: "200px",
                            overflowY: "auto",
                            mt: 1,
                            zIndex: 1,
                          }}
                        >
                          {filteredCurrencies.map((curr) => (
                            <Box
                              key={curr.currency}
                              onClick={() => handleCurrencySelect(curr.currency)}
                              sx={{
                                p: 1,
                                cursor: "pointer",
                                "&:hover": {
                                  backgroundColor: "action.hover",
                                },
                                ...(isRtl && {
                                  textAlign: "right",
                                }),
                              }}
                            >
                              {curr.currency} - {curr.symbol}
                            </Box>
                          ))}
                        </Paper>
                      )}
                    </Box>
                  </Box>

                  <Divider />

                  {/* Currency Info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      gap: 1.5,
                      bgcolor: "info.lighter",
                      p: 1.5,
                      borderRadius: 1,
                      ...(isRtl && {
                        flexDirection: "row-reverse",
                      }),
                    }}
                  >
                    <Public fontSize="small" sx={{ color: "info.main", mt: 0.5 }} />
                    <Box sx={{ textAlign: isRtl ? "right" : "left" }}>
                      <Typography variant="body2" color="info.main" sx={{ fontWeight: 500 }}>
                        {trans("topHeader.currencyInfo.title")}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {trans("topHeader.currencyInfo.description")}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                      ...(isRtl && {
                        flexDirection: "row-reverse",
                      }),
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => setOpen(false)}
                      sx={{
                        flex: 1,
                        ...(isRtl ? { ml: 1 } : { mr: 1 }),
                      }}
                    >
                      {trans("common.cancel")}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      sx={{
                        flex: 1,
                        ...(isRtl ? { mr: 1 } : { ml: 1 }),
                      }}
                    >
                      {trans("common.save")}
                    </Button>
                  </Box>
                </Stack>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default LanguageCurrencyDropdown

