import React, {useState, useEffect} from "react";
import Layout from "./../components/Layout/Layout.js";
import axios from "axios";
import {Checkbox, Radio} from "antd";
import { Prices } from "../components/Prices.js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart.js";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([]);
const [checked, setChecked] = useState([]);
const [radio, setRadio] = useState([]);
const [total, setTotal] = useState(0);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);


//Get All Categories
const getAllCategory = async () => {
  try {
      const {data} = await axios.get("/api/v1/category/get-category")
      if(data?.success)
      setCategories(data?.category);
  } catch (error) {
      console.log(error);
  }
};
useEffect(() => {
getAllCategory();
getTotal();
}, []);

//Get Products
const getAllProducts = async () => {
  try {
    setLoading(true);
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
  } catch (error) {
    setLoading(false);
      console.log(error);
  }
};

//Get TotalCount
const getTotal= async () => {
  try {
    const {data} = await axios.get("/api/v1/product/product-count");
    setTotal(data?.total)
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (page === 1) return;
  loadMore();
}, [page]);

//Load MOre
 const loadMore = async() => {
  try {
    setLoading(true);
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
 };

//Filter by Category
const handleFilter = (value,id) => {
  let all = [...checked];
  if (value) {
    all.push(id);
  } else {
    all = all.filter(c => c !== id);
  }
  setChecked(all);
};
useEffect(() => {
  if (!checked.length || !radio.length) getAllProducts();
  
  }, [checked.length, radio.length]);
  
useEffect(() => {
  if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

// Get Filtered Product
 const filterProduct = async () => {
 try {
  const {data} = await axios.post("/api/v1/product/product-filters", {checked, radio});
  setProducts(data?.products);
 } catch (error) {
  console.log(error);
 }
 }

  return (
    <Layout title={"All Products - Buy Now"}>
    <div className="row mt-3">
        <div className="col-md-3">
        <h2 className="text-center">Filter By Category</h2>
        <div className="Filter">
        {categories?.map((c) => (
          <Checkbox key={c._id} onChange={(e) =>  handleFilter(e.target.checked, c._id ) }>
          {c.name}
          </Checkbox>
        ))}
        </div>
        {/* Price Filter */}
        <h2 className="text-center mt-4">Filter By Price</h2>
        <div className="Filter">
        <Radio.Group onChange={(e) => setRadio (e.target.value)}>
      {Prices?.map((p) => (
        <div key={p._id}>
      <Radio value={p.array}>{p.name}</Radio>
        </div>
      ))}
        </Radio.Group>
        </div>
        <div className="Filter">
        <button
        className="btn btn-danger m-4"
        onClick={() => window.location.reload()}
        >
    RESET FILTERS
        </button>
        </div>
        </div>
        <div className="col-md-9">
        <h1 className="text-center">All Products</h1>
        <div className="d-flex flex-wrap">
        {products?.map((p) => (
            
            <div className="card m-3" style={{ width: '18rem' }}  key={p._id}>
                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0-30)}...</p>
                  <p className="card-text">Rs {p.price}</p>
                  <button class="btn btn-primary ms-2"
                  onClick={() => navigate(`/product/${p.slug}`)}
                  >View Details</button>
                  <button class="btn btn-secondary ms-1"
                  onClick={() =>  {
                    setCart([...cart, p])
                  toast.success("Item Added to Cart");
                     }}>
                  ADD TO CART
                  </button>
                </div>
              </div>    
          ))}
        </div>
        <div className="m-2 p-3">
        {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ?  "Loading ..."  :   "Loadmore"  }
              </button>
            )}
        </div>
        </div>
        </div>
    </Layout>
  );
};

export default HomePage;