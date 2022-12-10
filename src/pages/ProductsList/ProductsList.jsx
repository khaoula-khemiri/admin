import "./productList.css"
import { DataGrid} from '@material-ui/data-grid';
import  {DeleteOutline} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {React,useState,useEffect} from 'react';
import { useDispatch ,useSelector} from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

const ProductsList = () => {
  const dispatch = useDispatch()
  const products = useSelector((state)=>state.product.products)


  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch]);

  const handleDelete = (id)=>{
    deleteProduct(id,dispatch)
    
   }


  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Product Name', width: 150 ,
     renderCell:(params)=>{
       return(
         <div className='productListUser'>
           <img className='productListImg' src={params.row.img} alt="" />
            {params.row.title} </div>
       )
     }},
    {
      field: 'categories',
      headerName: 'Categories',
      type: 'text',
      width:  130,
    },
    {
      field: 'inStock',
      headerName: 'instock',
      type: 'text',
      width:  100,
    },
    {
      field: 'size',
      headerName: 'Size',
      width:  110,
    },
    {
      field: 'color',
      headerName: 'Color',
      width:  110,
      renderCell:(params)=>{
        return(
          <div 
           style={{width:"15px",height:"15px",backgroundColor:`${params.row.color}`,borderRadius:"50%" }}>
           </div>
        )
      }
    },
    {
      field: 'price',
      headerName: 'Price',
      width:  120,
      renderCell:(params)=>{
        return(
          <div >
            ${params.row.price}
           </div>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width:  150,
      renderCell:(params)=>{
        return(
          <>
          <Link to={"/product/"+ params.row._id}>
          <button className='productListEdit' >Edit</button>
          </Link>
          <DeleteOutline className='productListDelete' onClick={()=>handleDelete(params.row._id)}/>
          </>
        )
      }
    }
  ];

  return (
    <div className='productList'>
        <DataGrid
       disableSelectionOnClick
        rows={products}
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default ProductsList

