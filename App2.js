import React, { useState } from "react";

const restaurantsData = [
  {
    id: 1,
    name: "Delicious",
    menu: [
      { id: 101, name: "Pongal", price: 55, imageUrl: "link_to_pongal_image" },
      { id: 102, name: "Itly", price: 29, imageUrl: "link_to_itly_image" },
      { id: 103, name: "Dosai", price: 69, imageUrl: "link_to_dosai_image" },
      { id: 104, name: "Biryani", price: 100, imageUrl: "link_to_biryani_image" },
    ],
  },
  // Add more restaurant data as needed
];

const App2 = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [order, setOrder] = useState([]);
  const [userName, setUserName] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("delivery");
  const [showScanner, setShowScanner] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setOrder([]);
    setUserName("");
    setUserLocation("");
    setPaymentMethod("delivery");
    setShowScanner(false);
  };

  const handleOrderItemAdd = (item) => {
    setOrder([...order, item]);
  };

  const handleOrderItemRemove = (itemId) => {
    setOrder(order.filter((item) => item.id !== itemId));
  };

  const handleOrderSubmit = () => {
    if (!userName || !userLocation || (paymentMethod === "online" && showScanner)) {
      alert("Please fill in your name and location.");
      return;
    }

    if (paymentMethod === "online") {
      setShowScanner(true);
      setTimeout(() => {
        alert("Payment successful!");
        setShowScanner(false);
        handleFeedback();
      }, 2000); // Simulate payment processing time
    } else {
      alert("Order placed successfully!");
      handleFeedback();
    }
  };

  const handleFeedback = () => {
    const feedbackMessage = `Feedback from ${userName} (${userLocation}): ${feedback}, Rating: ${rating} stars.`;
    alert(feedbackMessage);
  };

  const totalAmount = order.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "20px" }}>
      <h1 style={{ color: "#3f51b5", marginBottom: "20px" }}>Food Delivery Website</h1>
      <div>
        <h2 style={{ color: "#009688", marginBottom: "10px" }}>Restaurants</h2>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {restaurantsData.map((restaurant) => (
            <li key={restaurant.id}>
              <button
                style={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  padding: "8px 16px",
                  border: "none",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
                onClick={() => handleRestaurantSelect(restaurant)}
              >
                {restaurant.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedRestaurant && (
        <div>
          <h2 style={{ color: "#009688", marginBottom: "10px" }}>Menu - {selectedRestaurant.name}</h2>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {selectedRestaurant.menu.map((item) => (
              <li key={item.id} style={{ marginBottom: "10px" }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: "50px", marginRight: "10px" }} />
                <span style={{ color: "#3f51b5", marginRight: "10px" }}>{item.name}</span>
                <span style={{ color: "#009688" }}>₹{item.price}</span>
                <button
                  style={{
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    padding: "5px 10px",
                    border: "none",
                    marginLeft: "10px",
                  }}
                  onClick={() => handleOrderItemAdd(item)}
                >
                  Add to Order
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {order.length > 0 && (
        <div>
          <h2 style={{ color: "#009688", marginBottom: "10px" }}>Your Order</h2>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {order.map((item) => (
              <li key={item.id} style={{ marginBottom: "5px" }}>
                <span style={{ color: "#3f51b5", marginRight: "10px" }}>{item.name}</span>
                <span style={{ color: "#009688" }}>₹{item.price}</span>
                <button
                  style={{
                    backgroundColor: "#e91e63",
                    color: "#fff",
                    padding: "5px 10px",
                    border: "none",
                    marginLeft: "10px",
                  }}
                  onClick={() => handleOrderItemRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3 style={{ color: "#3f51b5" }}>Total Amount: ₹{totalAmount}</h3>
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />
            <input
              type="text"
              placeholder="Your Location"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />
            <div style={{ marginBottom: "10px" }}>
              <label>
                <input
                  type="radio"
                  value="delivery"
                  checked={paymentMethod === "delivery"}
                  onChange={() => setPaymentMethod("delivery")}
                />
                Delivery
              </label>
              <label style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                Online Payment
              </label>
            </div>
            {paymentMethod === "online" && showScanner && (
              <div style={{ marginBottom: "10px", padding: "10px", backgroundColor: "#eee" }}>
                <h4>Payment Scanner (Simulated)</h4>
                <p>Please scan your payment QR code.</p>
              </div>
            )}
            <button
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                padding: "8px 16px",
                border: "none",
                marginTop: "10px",
              }}
              onClick={handleOrderSubmit}
            >
              Place Order
            </button>
          </div>
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ color: "#009688" }}>Rate Your Food</h3>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={{ padding: "5px" }}
            >
              <option value="0">Select Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
            <textarea
              placeholder="Your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              style={{ marginTop: "10px", width: "100%", height: "60px" }}
            />
            <button
              style={{
                backgroundColor: "#3f51b5",
                color: "#fff",
                padding: "8px 16px",
                border: "none",
                marginTop: "10px",
              }}
              onClick={handleFeedback}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App2;
