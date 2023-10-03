import React, {useState, useEffect} from "react";
import Layout from "./../components/Layout/Layout.js";
import axios from "axios";
import { useParams } from "react-router-dom";


const ProductDetails = () => {
  const params = useParams();
  const [products, setProducts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initial product details
  useEffect(() => {
    if(params?.slug) getProduct()
  }, [params?.slug])
  //Get Products
  const getProduct = async () => {
    try {
      const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setProducts(data?.products);
     getSimilarProduct(data?.products._id, data?.products.category._id );
    } catch (error) {
      console.log(error);
    }
  };
// get Similar Products
 const getSimilarProduct = async (pid, cid) => {
try {
  const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
  setRelatedProducts(data?.products);
} catch (error) {
  console.log(error);
}
 };

  return (
    <Layout>
 <div className="row container mt-2">
        <div className="col-md-6">
        <img src={`/api/v1/product/product-photo/${products._id}`} className="card-img-top" alt={products.name} 
       height="500"
            width={"400px"}
        />
        </div>
        <div className="col-md-6">
        <h1 className="text-center my-7">Product Details</h1>
        <h6 className="p-1">Name: {products.name}</h6>
        <h6 className="p-1">Description: {products.description}</h6>
            <h6 className="p-1">Price: {products.price}</h6>
      <h6 className="p-1">Category: {products?.category?.name}</h6>
      <button class="btn btn-secondary ms-2 p-2">ADD TO CART</button>
        </div>
        </div>
        <div className="row container"> 
        <h1>Similar Products</h1>
        {relatedProducts.length < 1 && <p className="text-center">No Similar Products Found</p>}
        <div className="d-flex flex-wrap">
        {relatedProducts?.map((p) => (
            <div className="card m-3" style={{ width: '18rem' }}  key={p._id}>
                <img src={`/api/v1/product/product-photo/${p?._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}...</p>
                  <p className="card-text">Rs {p.price}</p>
                  <button class="btn btn-secondary ms-2">ADD TO CART</button>
                </div>
              </div>    
          ))}
        </div>
        </div>
    </Layout>
  );
};

export default ProductDetails;