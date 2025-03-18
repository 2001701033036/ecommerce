import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify';

export default function ProductDetail({ cartItems, setCartItems }) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1); // Quantity for the product
  const { id } = useParams(); // Grab the product ID from the URL params

  // Fetch product data when the component mounts
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/products/${id}`;
    console.log("Fetching product from:", url);

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res); // Check the structure of the response
        if (res.success) {
          setProduct(res.products);
        } else {
          console.error("Product not found");
        }
      })
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  // Function to add the product to the cart

  function addToCart() {
    const itemExist = cartItems.find((item) => item.product._id === product._id);

    if (!itemExist) {
        const newItem = { product, qty };
        setCartItems((state) => [...state, newItem]);
        toast.success("Cart item added successfully");
    } else {
        const updatedCart = cartItems.map((item) => {
            if (item.product._id === product._id) {
                return { ...item, qty: item.qty + qty };
            }
            return item;
        });
        setCartItems(updatedCart);
        toast.info("Cart item quantity updated");
    }
}


   function increaseQty(){
    if(product.stock == qty){
        return;
    }
    setQty((state)=>state+1);
   }

   function decreaseQty(){
    if(qty>1){

        setQty((state)=>state-1);

    }
   }


  // If product is still null (loading), show a loading message
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container container-fluid">
      <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          {/* Dynamically render product image */}
          <img src={product.images[0].image} alt={product.name} height="500" width="500" />
        </div>

        <div className="col-12 col-lg-5 mt-5">
          {/* Product Title */}
          <h3>{product.name}</h3>
          <p id="product_id">Product # {product._id}</p>

          <hr />

          {/* Product Ratings */}
          <div className="rating-outer">
            <div className="rating-inner" style={{ width: `${product.ratings * 20}%` }}></div> {/* Dynamically adjust rating */}
          </div>

          <hr />

          {/* Product Price */}
          <p id="product_price">{product.price}</p>

          {/* Stock Counter */}
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
            <input type="number" className="form-control count d-inline" value={qty} readOnly />
            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
          </div>
          <button type="button" onClick={addToCart} disabled={product.stock == 0} id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

          <hr />

          {/* Product Stock Status */}
          <p>Status: <span id="stock_status" className={product.stock > 0 ? 'text-success' : 'text-danger'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

          <hr />

          {/* Product Description */}
          <h4 className="mt-2">Description:</h4>
          <p>{product.description}</p>

          <hr />

          {/* Seller Information */}
          <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

          <div className="rating w-50"></div>
        </div>

      </div>
    </div>
  );
}
