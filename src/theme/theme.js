import { createTheme } from "@mui/material/styles";

const createCustomTheme = (direction, brand = {}) => {
  const isRTL = direction === "rtl";
  const { primary = {}, secondary = {}, fontFamily, ...otherBrand } = brand;

  //Dark Blue Theme
  // return createTheme({
  //   direction,
  //   components: {
  //     MuiInputBase: {
  //       styleOverrides: {
  //         input: {
  //           "&::placeholder": {
  //             fontSize: "12px",
  //             letterSpacing: "1px",
  //             opacity: 1,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   palette: {
  //     primary: {
  //       light: "#4D7ABF", // lighter navy for hover
  //       main: "#1D3557", // Navy Blue - trust/professional
  //       dark: "#0B203D", // Deep Navy
  //       contrastText: "#FFFFFF",
  //       gradientBg: "linear-gradient(135deg, #1D3557 0%, #0B203D 100%)",
  //       gradientBgHover: "linear-gradient(135deg, #254C72 0%, #1D3557 100%)",
  //     },
  //     secondary: {
  //       light: "#00D4D8", // brighter aqua
  //       main: "#00B4D8", // trade teal
  //       dark: "#1C6F64", // deep teal
  //       contrastText: "#FFFFFF",
  //     },
  //     accent: {
  //       light: "#FFD39B",
  //       main: "#F4A261", // Orange accent - energy
  //       dark: "#C6742C",
  //       contrastText: "#FFFFFF",
  //     },
  //     neutral: {
  //       light: "#F4F6F8", // light background grey
  //       main: "#9CA3AF", // medium neutral
  //       dark: "#374151", // dark neutral grey
  //       contrastText: "#FFFFFF",
  //     },
  //     gold: {
  //       light: "#FFD700", // highlight
  //       main: "#E6B800", // premium / success
  //       dark: "#B38F00",
  //       contrastText: "#1E293B",
  //     },
  //     background: {
  //       default: "#F8FAFC", // light gray background
  //       paper: "#FFFFFF",
  //       alternate: "#EEF2F7",
  //       highlight: "#FAFAF5", // subtle warm neutral for emphasis
  //     },
  //     text: {
  //       primary: "#1E293B", // headings
  //       secondary: "#475569", // body
  //       muted: "#64748B", // softer text
  //       disabled: "#94A3B8",
  //       hint: "#94A3B8",
  //     },
  //     success: {
  //       light: "#81C784",
  //       main: "#4CAF50", // growth green
  //       dark: "#2E7D32",
  //       contrastText: "#FFFFFF",
  //     },
  //     warning: {
  //       light: "#FFE082",
  //       main: "#FFC107",
  //       dark: "#C79100",
  //       contrastText: "#333333",
  //     },
  //     info: {
  //       light: "#93C5FD",
  //       main: "#3B82F6", // bright info blue
  //       dark: "#1E40AF",
  //       contrastText: "#FFFFFF",
  //     },
  //     error: {
  //       light: "#FF9A9A",
  //       main: "#D00000",
  //       dark: "#900000",
  //       contrastText: "#FFFFFF",
  //     },
  //     divider: "#E0E0E0",
  //   },

  //   typography: {
  //     fontFamily: fontFamily
  //       ? fontFamily
  //       : isRTL
  //       ? "var(--font-almarai)"
  //       : "var(--font-roboto), sans-serif",
  //     h1: { fontSize: "2.5rem", fontWeight: 700, color: "#1E293B" },
  //     h2: { fontSize: "2rem", fontWeight: 700, color: "#1E293B" },
  //     h3: { fontSize: "1.75rem", fontWeight: 500, color: "#1E293B" },
  //     body1: { fontSize: "1rem", color: "#475569" },
  //     body2: { fontSize: "0.875rem", color: "#475569" },
  //     button: { fontWeight: 700, textTransform: "none" },
  //   },

  //   shape: { borderRadius: 8 },
  //   zIndex: {
  //     appBar: 1100,
  //     drawer: 1200,
  //     modal: 2000,
  //     snackbar: 2300,
  //     tooltip: 2500,
  //   },
  //   spacing: 8,
  //   breakpoints: {
  //     values: { xxs: 350, xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
  //   },
  //   transitions: {
  //     duration: {
  //       shortest: 150,
  //       shorter: 200,
  //       short: 250,
  //       standard: 300,
  //       complex: 375,
  //       enteringScreen: 225,
  //       leavingScreen: 195,
  //     },
  //   },
  //   ...otherBrand,
  // });

  return createTheme({
    direction,
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&::placeholder": {
              fontSize: "12px",
              letterSpacing: "1px",
              opacity: 1,
            },
          },
        },
      },
    },
    palette: {
      primary: {
        light: "#FFD700", // Bright Gold
        main: "#E6B800", // Gold
        dark: "#B38F00",
        white: "#FFFFFF",
        contrastText: "#1E293B",
        gradientBg: "linear-gradient(135deg, #FFD700 0%, #B38F00 100%)",
        gradientBgHover: "linear-gradient(135deg, #FFE34D 0%, #E6B800 100%)",
      },
      secondary: {
        light: "#34D399", // light green
        main: "#059669", // emerald green
        dark: "#065F46", // deep green
        contrastText: "#FFFFFF",
      },
      accent: {
        light: "#FFF8E1", // soft cream
        main: "#F4A261", // warm orange accent
        dark: "#C6742C",
        contrastText: "#1E293B",
      },
      neutral: {
        light: "#F4F6F8", // light background grey
        main: "#9CA3AF", // medium neutral
        dark: "#374151", // dark neutral grey
        contrastText: "#FFFFFF",
      },
      gold: {
        light: "#FFD700",
        main: "#E6B800",
        dark: "#B38F00",
        contrastText: "#1E293B",
      },
      background: {
        default: "#F8FAFC", // light gray background
        paper: "#FFFFFF",
        alternate: "#EEF2F7",
        highlight: "#FAFAF5", // subtle warm neutral for emphasis
      },
      text: {
        primary: "#1E293B", // headings
        secondary: "#475569", // body
        muted: "#64748B", // softer text
        disabled: "#94A3B8",
        hint: "#94A3B8",
      },
      success: {
        light: "#81C784",
        main: "#4CAF50", // growth green
        dark: "#2E7D32",
        contrastText: "#FFFFFF",
      },
      warning: {
        light: "#FFE082",
        main: "#FFC107",
        dark: "#C79100",
        contrastText: "#333333",
      },
      info: {
        light: "#93C5FD",
        main: "#3B82F6", // bright info blue
        dark: "#1E40AF",
        contrastText: "#FFFFFF",
      },
      error: {
        light: "#FF9A9A",
        main: "#D00000",
        dark: "#900000",
        contrastText: "#FFFFFF",
      },
      divider: "#E0E0E0",
    },

    typography: {
      fontFamily: fontFamily
        ? fontFamily
        : isRTL
        ? "var(--font-almarai)"
        : "var(--font-roboto), sans-serif",
      h1: { fontSize: "2.5rem", fontWeight: 700, color: "#1E293B" },
      h2: { fontSize: "2rem", fontWeight: 700, color: "#1E293B" },
      h3: { fontSize: "1.75rem", fontWeight: 500, color: "#1E293B" },
      body1: { fontSize: "1rem", color: "#475569" },
      body2: { fontSize: "0.875rem", color: "#475569" },
      button: { fontWeight: 700, textTransform: "none" },
    },

    shape: { borderRadius: 8 },
    zIndex: {
      appBar: 1100,
      drawer: 1200,
      modal: 2000,
      snackbar: 2300,
      tooltip: 2500,
    },
    spacing: 8,
    breakpoints: {
      values: { xxs: 350, xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    ...otherBrand,
  });
};

export default createCustomTheme;

/**
 * 
 * primary.main: “Add to Cart”, “Order Now” buttons

secondary.main: category highlights, tags, badges

background.default: base body

background.alternate: cards, modals, sections

text.primary: titles, labels

text.secondary: sublabels, descriptions
 */
