import React, { useContext, useEffect, useState } from "react";
import { store } from "../App";
import axios from "axios";
import Login from "./Login";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContactNavbar2 from "./ContactNavbar2";
import { Box, Button } from "@mui/material";
import Create from "./Create";
import Edit from "./Edit";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { getAllContactData,isLoadingState,deleteResponseState } from "../state/atoms";
import { deleteData } from "../utils/serverAPIs";



const Dashboard = () => {
  const [token, setToken] = useContext(store);
  const [allData, setAllData] = useRecoilState(getAllContactData);
  // const [userIdDelete, setUserIdDelete] = useRecoilState(userDeleteState);
  const [isLoading, setLoading] = useRecoilState(isLoadingState);
  const setDeleteResponse = useSetRecoilState(deleteResponseState);

  // const deleteIdData = useRecoilValue(userDeleteId);
  // const [deleteId, setDeleteId] = useRecoilState(userDeleteState);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/Dashboard', {
      headers: {
        'x-token': token
      }
    }).then(res => setData(res.data)).catch((err) => console.log(err));
  }, [])

  if (!token) {
    return <Login />
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleDeleteContact = (id) =>{
    // setUserIdDelete(id)

    handleDelete(id)

    // axios.delete(`http://localhost:8000/delete/${id}`)
    // .then(res => setUserIdDelete(res.data));

  }

  
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteData(id);
      setDeleteResponse('Data deleted successfully.');
    } catch (error) {
      setDeleteResponse('Failed to delete data.');
    } finally {
      setLoading(false);
    }
  };
  // console.log(deleteId);

  // const handleEditContact = (id) =>{
  //   console.log(id);
  // }
  return (
    <>
     {/* {isLoading ? <p>Loading...</p> : null} */}
      {
        data &&
        <ContactNavbar2 name={data.name}  />
      }
      {isLoading ? <p>Loading...</p> : null}
      <Box sx={{
        boxShadow: 1,
        width: '85%',
        // justifyContent: 'center',
        p: 1,
        m: 15,
      }}>
        <Create />
        <TableContainer >
          <Table aria-label="customized table" >
            <TableHead>
              <TableRow>
                <StyledTableCell>first Name</StyledTableCell>
                <StyledTableCell align="right">last Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((row) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {row.firstname}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.lastname}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.phone}</StyledTableCell>
                  <StyledTableCell align="right">{row.address}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="text" onClick={() => { handleDeleteContact((row._id)) }} >
                      <DeleteIcon />
                    </Button>
                      <Edit data={row} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
export default Dashboard;