import React from 'react';
import SelectField from "../components/SelectFields";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import SelectAmount from "../components/selectAmount";
import useAxios from "../hooks/useAxios";
import {useHistory} from "react-router-dom";

const Settings = () => {
  const {response,error,loading} = useAxios({url:"/api_category.php"})
  const history = useHistory()
  if(loading){
    return (
      <Box mt={20}>
        <CircularProgress/>
      </Box>
    )
  }
  if(error){
    return(
      <Typography variant="h6" mt={20} color="red">
        Something Went Wrong!
      </Typography>
    )
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/quiz")
  }
  return (
    <form onSubmit={handleSubmit}>
      <SelectField options={response.trivia_categories} label="Category"/>
      <SelectAmount/>
      <Box mt={3} width="100%">
        <Button type="submit" variant="contained" fullWidth color="success">Start</Button>
      </Box>
    </form>
  );
};

export default Settings;