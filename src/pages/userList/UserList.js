import { React, useState, useEffect } from 'react';
import "./userList.css"
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { userRows } from "../../dummyData"
import { Link } from 'react-router-dom';
import { userRequest } from "../../requestMethodes"
import axios from "axios"
import moment from 'moment';



const UserList = () => {
  const [data, setData] = useState(userRows);
  const [users, setUsers] = useState([]);
  const BASE_URL = "https://apishop.onrender.com/api/";
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.create({
          baseURL: BASE_URL,
          headers: { token: `Bearer ${currentUser?.accessToken}` }
        }).get("users");
        setUsers(res.data);
        console.log(res.data);

      } catch (err) {
        console.log(err.response.data);
      }
    };
    getUsers();

  }, [user]);

  const handleDelete = async (id) => {
    try {
      const res = await userRequest.delete("users/" + id);


    } catch (err) {
      console.log(err.response.data);
    }
    setUsers(users.filter(item => item._id !== id))
  }
  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'username', headerName: 'User name', width: 180,
      renderCell: (params) => {
        return (
          <div className='userListUser'>
            <img className='userListImg' src={params.row.img || "https://uybor.uz/borless/uybor/img/user-images/no-avatar.png"} alt="" />

            {params.row.username} </div>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 150,
    },
    {
      field: 'isAdmin',
      headerName: 'isAdmin',
      width: 130,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      width: 150,
      renderCell: (params) => {
        return (
          <div className='userListUser'>
            {moment(params.row.createdAt).format('DD/MM/YYYY HH:mm')}
          </div>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className='userListEdit' >Edit</button>
            </Link>
            <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row._id)} />
          </>
        )
      }
    }
  ];


  return (
    <div className='userList'>
      <DataGrid
        disableSelectionOnClick
        rows={users}
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

export default UserList;
