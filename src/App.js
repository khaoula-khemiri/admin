import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css"
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductsList from "./pages/ProductsList/ProductsList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user.currentUser);


  return (
    <Router>

      {user ?
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes  >
              <Route exact path="/" element={<Home />} />
              <Route exact path="/users" element={<UserList />} />
              <Route exact path="/user/:userId" element={<User />} />
              <Route exact path="/newUser" element={<NewUser />} />
              <Route exact path="/products" element={<ProductsList />} />
              <Route exact path="/product/:productsId" element={<Product />} />
              <Route exact path="/newProduct" element={<NewProduct />} />
              <Route exact path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
            </Routes>
          </div>
        </>
        : <Routes  >
          <Route exact path="/login" element={<Login />} />
        </Routes>
      }
    </Router>


  );
}

export default App;
