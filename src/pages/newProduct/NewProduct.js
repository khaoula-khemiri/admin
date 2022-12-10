import "./newProduct.css";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls"
import { useDispatch } from "react-redux"

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch()

  const handlechange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }


  const handleCat = (e) => {
    setCat([e.target.value, "All product"])
  }

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch)
        });
      }
    );

  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="title" onChange={handlechange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="description" onChange={handlechange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <select name="categories" id="idStock" onChange={handleCat}>
            <option selected>cat...</option>
            <option >Dress</option>
            <option >Shoes</option>
            <option >HandBags</option>
            <option >Accessories</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="price" onChange={handlechange} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input name="color" type="color" placeholder="color" onChange={handlechange} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <select name="size" id="idStock" onChange={handlechange}>
            <option >XS</option>
            <option >S</option>
            <option >M</option>
            <option >L</option>
            <option >XL</option>
            <option >38</option>
            <option >39</option>
            <option >40</option>
            <option >41</option>
            <option >42</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handlechange}>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}