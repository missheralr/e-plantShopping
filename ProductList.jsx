import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  
  // Lấy danh sách cây đã có trong giỏ để làm logic Disable nút
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", cost: "$15", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg" },
        { name: "Spider Plant", cost: "$12", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", cost: "$20", image: "https://cdn.pixabay.com/photo/2015/10/26/07/21/lavender-1006653_1280.jpg" },
        { name: "Rosemary", cost: "$18", image: "https://cdn.pixabay.com/photo/2019/08/21/16/03/rosemary-4421115_1280.jpg" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Aloe Vera", cost: "$14", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg" },
        { name: "Peppermint", cost: "$10", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#4CAF50', color: 'white' }}>
        <div style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>
          <h2>Paradise Nursery (Home)</h2>
        </div>
        <div>
          <button style={{ marginRight: '15px' }} onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>
            Cart ({totalCartItems})
          </button>
        </div>
      </nav>

      {/* RENDER VIEW */}
      {!showCart ? (
        <div className="product-list-container" style={{ padding: '20px' }}>
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2 style={{ textAlign: 'center', marginTop: '30px' }}>{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant, plantIndex) => {
                  // Kiểm tra xem cây này đã có trong giỏ chưa
                  const isAdded = cartItems.some(item => item.name === plant.name);
                  
                  return (
                    <div className="product-card" key={plantIndex}>
                      <img className="product-image" src={plant.image} alt={plant.name} />
                      <h3>{plant.name}</h3>
                      <p>{plant.cost}</p>
                      <button 
                        onClick={() => handleAddToCart(plant)} 
                        disabled={isAdded}
                        style={{ backgroundColor: isAdded ? '#ccc' : '#4CAF50', color: 'white', padding: '10px', border: 'none', cursor: isAdded ? 'not-allowed' : 'pointer' }}
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
