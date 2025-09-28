import { useState, useRef, useCallback, useMemo } from "react";
import {
  InputBase,
  IconButton,
  Paper,
  Popper,
  ClickAwayListener,
  Box,
  Rating,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Close } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { debounce } from "@mui/material/utils";
import CustomTypography from "../Typography/CustomTypography";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import ImageSkeleton from "../ImageSkeleton/ImageSkeleton";

// Mock API call
const fetchSearchResults = async (query) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock data filtering based on query
  const filteredTextSuggestions = [
    "playstation 5",
    "playstation 4",
    "playstation card",
    "playstation controller",
    "playstation 5 console",
    "playstation vr",
    "playstation 4 console",
    "playstation plus",
    "playstation headset",
    "playstation console",
  ].filter((suggestion) =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProductSuggestions = [
    {
      name: "Sony - PlayStation 5 Console",
      image: "/imgs/products/cancer varsity jacket.png",
      rating: 4.8,
      description: "Next-gen gaming console",
    },
    {
      name: "Sony - DualSense Wireless Controller",
      image: "/imgs/products/cancer varsity jacket.png",
      rating: 4.7,
      description: "For PlayStation 5",
    },
    {
      name: "Sony - PULSE 3D Wireless Headset",
      image: "/imgs/products/cancer varsity jacket.png",
      rating: 4.5,
      description: "Compatible with PlayStation 5",
    },
    {
      name: "Sony - PULSE 3D Varsity Jacket Headset",
      image: "/imgs/products/cancer varsity jacket.png",
      rating: 4.5,
      description: "Compatible with PlayStation 5",
    },
    {
      name: "Addidas - 3D T-Shirt for Sports",
      image: "/imgs/products/cancer varsity jacket.png",
      rating: 4.5,
      description: "Compatible with PlayStation 5",
    },
    {
      name: "NewYou Sports - 3D T-Shirt for Sports",
      image: "/imgs/products/cancer varsity jacket.png",
      rating: 4.5,
      description: "compatible with sports, soccer, basketball, 7v7 flag football teams..",
    },
    {
      name: "NewYou Sports - 3D T-Shirt for Sports",
      image: "/imgs/products/cancer varsity jacket.png",
      rating: 4.5,
      description: "compatible with sports, soccer, basketball, 7v7 flag football teams..",
    },
    {
      name: "NewYou Sports - 3D T-Shirt for Sports",
      image: "/imgs/products/cancer varsity jacket.png",
      rating: 4.5,
      description: "compatible with sports, soccer, basketball, 7v7 flag football teams..",
    },
    {
      name: "NewYou Sports - 3D T-Shirt for Sports",
      image: "/imgs/products/cancer varsity jacket.png",
      rating: 4.5,
      description: "compatible with sports, soccer, basketball, 7v7 flag football teams..",
    },
  ].filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return {
    textSuggestions: filteredTextSuggestions,
    productSuggestions: filteredProductSuggestions,
  };
};

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textSuggestions, setTextSuggestions] = useState([]);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const searchRef = useRef(null);
  const { isRtl, isSmallScreen } = useResponsiveLayout();
  const trans = useTranslations("translations.searchBar");

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query) => {
        setIsLoading(true);
        try {
          const results = await fetchSearchResults(query);
          setTextSuggestions(results.textSuggestions);
          setProductSuggestions(results.productSuggestions);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      }, 300),
    []
  );

  const handleSearchChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      setSearchValue(newValue);
      setShowSuggestions(true);
      if (newValue) {
        debouncedSearch(newValue);
      } else {
        setTextSuggestions([]);
        setProductSuggestions([]);
      }
    },
    [debouncedSearch]
  );

  const handleSearchFocus = useCallback(() => {
    setShowSuggestions(true);
  }, []);

  const handleClickAway = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setShowSuggestions(false);
    setSearchValue("");
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 800,

          borderRadius: '6px'
        }}>
        <Paper
          ref={searchRef}
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: "45px",
            width: "100%",
          }}
        >
          <InputBase
            sx={{ ml: isRtl ? 0 : 2, mr: isRtl ? 2 : 0, flex: 1, fontSize: isSmallScreen ? "0.80rem" : "0.85rem" }}
            placeholder={trans("search-placeholder")}
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />
          <IconButton
            sx={{ ml: isRtl ? 0 : 1, mr: isRtl ? 1 : 0 }}
            aria-label={searchValue ? trans("close") : trans("search")}
            onClick={searchValue ? handleSearchToggle : undefined}
          >
            {searchValue ? <Close sx={{ fontSize: "0.95rem" }} /> : <SearchIcon sx={{ fontSize: "0.95rem" }} />}
          </IconButton>
        </Paper>
        <Popper
          open={showSuggestions}
          anchorEl={searchRef.current}
          placement="bottom-start"
          sx={{ width: "100%", maxWidth: 800, zIndex: 1301 }}
        >
          <Paper elevation={3} sx={{ mt: 2, overflow: "hidden", maxHeight: "70vh", overflowY: "auto" }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
              >
                <Box
                  sx={{
                    width: "40%",
                    borderRight: isRtl ? 0 : 1,
                    borderLeft: isRtl ? 1 : 0,
                    borderColor: "divider",
                    p: 2,
                  }}
                >
                  {textSuggestions.map((suggestion, index) => (
                    <CustomTypography
                      key={index}
                      color={"theme.secondary.dark"}
                      variant="body2"
                      fontSize={isSmallScreen ? "0.575rem" : "0.85rem"}
                      sx={{
                        py: 0.5,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      {suggestion}
                    </CustomTypography>
                  ))}
                </Box>
                <Box sx={{ width: "60%", p: 2 }}>
                  {productSuggestions.map((product, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: isRtl ? "row-reverse" : "row",
                        alignItems: "center",
                        mb: 1,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Box
                        sx={{
                          order: isRtl ? 2 : 1,
                          ml: isRtl ? 2 : 0,
                          mr: isRtl ? 0 : 2,
                        }}
                      >

                        <ImageSkeleton
                          src={product.image}
                          alt={product.name}
                          width={isSmallScreen ? 30 : 70}
                          height={isSmallScreen ? 30 : 70}
                        />
                      </Box>
                      <Box
                        sx={{
                          order: isRtl ? 1 : 2,
                          textAlign: isRtl ? "right" : "left",

                        }}
                      >
                        <CustomTypography
                          color={"theme.primary.main"}
                          variant="subtitle2"
                          fontSize={isSmallScreen ? "0.575rem" : "0.775rem"}
                          sx={{ mb: -1 }}
                        >
                          {product.name}
                        </CustomTypography>
                        <Rating
                          value={product.rating}
                          readOnly
                          size="small"
                          sx={{
                            flexDirection: isRtl ? "row-reverse" : "row",
                            fontSize: isSmallScreen ? "0.575rem" : "0.775rem",


                          }}
                        />
                        <CustomTypography
                          variant="body2"
                          color="text.secondary"

                          fontSize={isSmallScreen ? "0.575rem" : "0.775rem"}
                        >
                          {product.description}
                        </CustomTypography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;

