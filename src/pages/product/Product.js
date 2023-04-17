import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../requestMethodes"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import BeatLoader from "react-spinners/BeatLoader";
export default function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [product, setProduct] = useState([]);
  const [pStats, setPStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState();
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income/?" + id);
        const list = res.data.sort((a, b) => { return a._id - b._id })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err.response.data);
        console.log("err")
      }
    };
    getStats();

  }, [MONTHS]);


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("/products/find/" + id);
        setProduct(res.data)
      } catch (err) {
        console.log(err.response.data);

      }
    };
    getProduct();

  }, [product]);

  const updateProduct = async (id, input) => {
    try {
      const res = await userRequest.put("/products/" + id, input);
      setProduct(res.data)
      setLoading(false);
      setSucess(true)
    } catch (err) {
      console.log(err.response.data);
      setSucess(false)
    }
  }


  const handlechange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }


  const handleCat = (e) => {
    setCat([e.target.value, "All product"])
  }

  const handleClick = (e, id) => {
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
        setLoading(true);
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
          console.log(product);
          updateProduct(id, product)
        });
      }
    );

  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock ? "yes" : "no"}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">likes:</span>
              <span className="productInfoValue">{product.likes}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">

            <div className="productFormLeftInput">
              <label>Product Name</label>
              <input name="title" type="text" placeholder={product.title} onChange={handlechange} />
            </div>


            <div className="productFormLeftInput">
              <label>Product Description</label>
              <textarea name="desc" placeholder={product.desc} onChange={handlechange} />
            </div>

            <div className="productFormLeftInput">
              <label> Categories</label>
              <select name="categories" id="idStock" onChange={handleCat}>
                <option selected>cat...</option>
                <option >Dress</option>
                <option >Shoes</option>
                <option >HandBags</option>
                <option >Accessories</option>
              </select>
            </div>

            <div className="productFormLeftInput">
              <label>Price</label>
              <input name="price" type="number" placeholder={product.price} onChange={handlechange} />
            </div>

            <div className="productFormLeftInput">
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

            <div className="productFormLeftInput">
              <label>Color</label>
              <input name="color" type="color" placeholder={product.price} onChange={handlechange} />
            </div>

            <div className="productFormLeftInput">
              <label>In Stock</label>
              <select name="inStock" id="idStock" onChange={handlechange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
            </div>
            <div className="productButtonContainer">
              <button className="productButton" onClick={e => handleClick(e, id)}>Update</button>
              {loading &&
                <BeatLoader
                  color={'#00008B'}
                  loading={loading}
                  size={5}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />}
              {sucess && <div> update successfully </div>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
