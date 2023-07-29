import React,{useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, Fab, Snackbar } from "@mui/material";
import {Avatar,Card,CardContent,Typography,Box,Toolbar,Tooltip,Button,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import './staff.css'
import { useDeleteUserMutation } from "../../../services/user";
import { getToken } from "../../../services/localStorageService";
import { useSelector } from "react-redux";
function StaffCard(props) {
  const [open, setOpen] = useState(false);
  const [snackopen, setSnackOpen] = useState(false);
  const { username, id, department, profile_image, email } = props;
  const {access_token}=getToken()
  const user=useSelector((state)=>state.user)
  const navigate = useNavigate();
  const handleProfileView = () => {
    navigate(`/admin/staff/viewprofile/${id}`);
  };
  const handleEditProfile = () => {
    navigate(`/admin/staff/editprofile/${id}`);
  };
  const [deleteUser]=useDeleteUserMutation()
  const handleDelete = async() => {
    const res=await deleteUser({id,access_token})
    if (res.data){
      setSnackOpen(true)
      navigate('/admin/staff')
      window.location.reload();
    }
    handleClose()
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
    <>
      <Card sx={{ borderRadius: 10, backgroundColor: "#f7f5fa"}}>
        <CardContent>
          <Box>
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Avatar src={profile_image?`http://127.0.0.1:8000${profile_image}`:null} sx={{ width: 100, height: 100 }} />
            </Box>
            <Box sx={{ fontSize: "10px", mt: 3 }}>
              <Typography fontWeight="bold" sx={{ display: "inline" }}>
                Username :
              </Typography>
              <Typography sx={{ display: "inline", m: 1 }}>
                {username}
              </Typography>
            </Box>
            <Box sx={{ fontSize: "10px" }}>
              <Typography fontWeight="bold" sx={{ display: "inline" }}>
                Department :
              </Typography>
              <Typography sx={{ display: "inline", ml: 1 }}>
                {department}
              </Typography>
            </Box>
            <Box sx={{ fontSize: "10px", mb: 2 }}>
              <Typography fontWeight="bold" sx={{ display: "inline" }}>
                Email :
              </Typography>
              <Typography sx={{ display: "inline", ml: 1 }}>{email}</Typography>
            </Box>
          </Box>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <Fab color="primary" size="small" onClick={handleProfileView}>
              <Tooltip title="View Profile" arrow>
                <RemoveRedEyeIcon aria-label="View profile" />
              </Tooltip>
            </Fab>
            <Fab
              color="secondary"
              size="small"
              aria-label="edit"
              sx={{ m: 1 }}
              onClick={handleEditProfile}
            >
              <Tooltip title="Edit" arrow>
                <EditIcon />
              </Tooltip>
            </Fab>
            <Fab color="error" size="small" onClick={handleOpen} disabled={username===user.username?true:false}>
              <Tooltip title="Delete" arrow>
                <DeleteIcon aria-label="Delete" />
              </Tooltip>
            </Fab>
          </Toolbar>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackopen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          User has been deleted successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default StaffCard;
