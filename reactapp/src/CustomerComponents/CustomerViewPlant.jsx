import React from 'react';
import CustomerNavbar from './CustomerNavbar';

const plants = [
  { id: 1, name: "Rose", category: "Flower", price: "$10", tips: "Water regularly" },
  { id: 2, name: "Tulip", category: "Flower", price: "$12", tips: "Keep in sunlight" },
  { id: 3, name: "Cactus", category: "Succulent", price: "$8", tips: "Minimal water required" }
];

const CustomerViewPlant = () => {
  return (
    <div>
      <CustomerNavbar />
      
      {/* Updated heading to match the test case */}
      <h1>Available Plants</h1>

      <button>Logout</button>

      <table role="table">
        <thead>
          <tr>
            <th>Images</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Tips</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {plants.map((plant) => (
            <tr key={plant.id}>
              <td>
                <img 
                  src={`path/to/${plant.name.toLowerCase().replace(/ /g, '-')}.jpg`} 
                  alt={plant.name} 
                  width="50" 
                />
              </td>
              <td>{plant.name}</td>
              <td>{plant.category}</td>
              <td>{plant.price}</td>
              <td>{plant.tips}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerViewPlant;
