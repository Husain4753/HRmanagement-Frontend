import {
  Grid,
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  InputBase,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./staff.css";
import StaffCard from "./StaffCard";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CsvExporter from "../../ExportToCSV";
import { useNavigate } from "react-router-dom";
import { useGetAllUserProfileQuery } from "../../../services/user";
import { getToken } from "../../../services/localStorageService";
import Loader from "../../Loader";

function Staff() {
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [userData, setUserData] = useState([]);
  const [open,setOpen]=useState(true)
  const [searchResults, setSearchResults] = useState([]);
  const { access_token } = getToken();
  const { data, isSuccess ,isLoading} = useGetAllUserProfileQuery(access_token);
  useEffect(() => {
    if (isSuccess) {
      console.log(data)
      setUserData([...data]);
      setSearchResults([...data])
    }
  }, [data]);
  const tableHeaders = [
    { label: "ID", key: "id" },
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Contact", key: "contact" },
    { label: "Department", key: "department" },
    { label: "Profile Image", key: "profile_image" },
    { label: "Is Admin", key: "is_admin" },
    { label: "Created At", key: "created_at" },
    { label: "Updated At", key: "updated_at" },
  ];
  const handleClose=()=>{
    setOpen(false)
  }
  const handleSearch = (event) => {
    event.preventDefault();
    if (search !== undefined) {
      const results = userData.filter((item) =>
        item.username.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(results);
    }
  };
  const handleAddProfile = () => {
    navigate("addprofile");
  };
  return (
    <>
      <Box className="Box">
        {isLoading?<Loader/>:<>
        <Toolbar>
          <Box
            component="form"
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              mr: 3,
              width: "240px",
            }}
            onSubmit={handleSearch}
          >
            <InputBase
              placeholder="Search"
              sx={{ ml: 2, flex: 0, width: "180px" }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <IconButton aria-label="search" type="submit" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
          <CsvExporter
            data={searchResults}
            filename="Userlist.csv"
            headers={tableHeaders}
          />
        </Toolbar>
        <Grid container sx={{ mr:0 }}>
          {searchResults.map((element) => {
            // console.log(element);
            return (
              <Grid item md={3} sm={5} xs={12} sx={{ml:4}}>
                <StaffCard
                  username={element.username}
                  id={element.id}
                  profile_image={element.profile_image}
                  department={element.department}
                  email={element.email}
                  open={open}
                  setOpen={setOpen}
                />
              </Grid>
            );
          })}
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          className="float-end"
          onClick={handleAddProfile}
          sx={{
            position: "fixed",
            bottom: 30,
            right: { xs: "calc(50%)", md: 40 },
          }}
        >
          <Tooltip title="Add new Staff profile" arrow>
            <AddIcon />
          </Tooltip>
        </Fab>
        
      </>}
      </Box>
    </>
  );
}

export default Staff;
