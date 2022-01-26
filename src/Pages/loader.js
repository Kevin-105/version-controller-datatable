import { Backdrop, CircularProgress } from "@mui/material"

export const Loader =()=>{
    return(
        <div style={{minHeight:'650px'}}>
              <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        </div>
      
      
    )
}