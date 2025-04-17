import React from 'react'
import CustomerNavbar from './CustomerNavbar'

const CustomerViewPlant = () => {
  return (
    <div>
      <CustomerNavbar />
      <h1>Plants</h1>
      <table>
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
          
            <tr key={index}>
              <td><img src={`path/to/${Name.toLowerCase().replace(' ', '-')}.jpg`} alt={Name} width="50" /></td>
              <td>{Name}</td>
              <td>Category</td>
              <td>Price</td>
              <td>Tips</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
        </tbody>


      </table>

    </div>
  )
}

export default CustomerViewPlant
