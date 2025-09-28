import { Heading } from "./HeadingTitle.style";
import PropTypes from "prop-types";

const HeadingTitle = ({
  title = "",
  variant = "h6",
  borderColor,
  align = "left",
  className = "",
  sx = {}, // MUI style override
  underline = true, // 👈 new prop
}) => {
  return (
    <Heading
      variant={variant}
      borderColor={borderColor}
      align={align}
      className={className}
      sx={sx}
      underline={underline ? 1 : 0} // custom pass
    >
      {title}
    </Heading>
  );
};

HeadingTitle.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  borderColor: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
  className: PropTypes.string,
  sx: PropTypes.object,
};

export default HeadingTitle;
