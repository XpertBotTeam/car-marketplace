import { createTheme } from '@mui/material'
import { purple } from '@mui/material/colors'

const colors = {
   primary: {
      main: '#292930',
   },
   secondary: {
      main: '#3EB650',
   },
}

const themeMui = createTheme({
   palette: {
      primary: {
         main: colors.primary.main,
      },
      secondary: {
         main: colors.secondary.main,
      },
   },
})

export default themeMui