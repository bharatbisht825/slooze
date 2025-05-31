import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [role,setRole]=useState("")
  useEffect(()=>{getOrder()},[])
  async function getOrder(params) {
    const orderData=await fetch("http://localhost:5000/getOrder",{credentials:"include"})
    const parsedData= await orderData.json()
    console.log(parsedData)
    setOrders(parsedData.orderData)
    setRole(parsedData.role)
  }


  async function delOrder(_id) {
    const deleteOrder=await fetch("http://localhost:5000/delOrder",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({_id})
    })
    const parsedData= await deleteOrder.json()
    if(deleteOrder.ok){
        console.log(parsedData)
        window.location.reload()
    }
    
  }

  

  return (
    <div className="p-6 w-full">
        <div className="relative h-16 w-full flex justify-end items-center bg-white border-b border-black shadow px-4 space-x-4">
                      <div className='relative right-100 text-xl '>Orders ({role})</div>

                      <Link to="/dashboard" className="border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">
                        Home
                      </Link>
                      <Link to="/quee" className="border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">
                        Quee
                      </Link>
                      <Link to="/checkout" className="border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">
                        Checkout
                      </Link>
                      <Link to="/orders" className="border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition"
                      >
                        Orders
                      </Link>
                </div>
      <div className="h-[700px] overflow-y-auto p-2">
  {orders.map(order => (
    <div
      key={order._id}
      className="bg-white border border-gray-300 rounded-lg shadow-sm p-5 mb-6 hover:shadow-md transition-shadow"
    >
      <p className="mb-1">
        <strong>Id:</strong> <span className="text-gray-700">{order._id}</span>
      </p>
      <p className="mb-1">
        <strong>Email:</strong> <span className="text-gray-700">{order.clientEmail}</span>
      </p>
      <p className="mb-1">
        <strong>Payment:</strong> <span className="text-gray-700">{order.paymentMethod}</span>
      </p>
      <p className="mb-4">
        <strong>Date:</strong> <span className="text-gray-700">{new Date(order.date).toLocaleString()}</span>
      </p>

      <button
        onClick={() => delOrder(order._id)}
        disabled={role === "member"}
        className={`mt-2 px-5 py-2 rounded text-white transition 
          ${role === "member" ? "bg-gray-50 cursor-not-allowed" : "bg-red-600"}`}
      >
        Cancel
      </button>
    </div>
  ))}
</div> 
    </div>
  );
};
export default Orders;
