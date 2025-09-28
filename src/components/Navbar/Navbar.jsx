
import { Box } from '@mui/material'
import NavItems from './NavItems'


const Navbar = ({ group, orientation = "vertical", collapsed = false, className, getIsActive, content=null,   }) => {

  return (
    <Box>
      <NavItems
        orientation={orientation}
        groupKey={group}
        collapsed={collapsed}
        className={className}
        getIsActive={getIsActive}

      />
      
      {content}  {/* Additional content such as ads, image, vides etc */}
      
    </Box>

  )
}

export default Navbar