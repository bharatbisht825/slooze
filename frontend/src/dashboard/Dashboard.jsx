import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Dashboard() {
  const [restaurant, setRestaurant] = useState([]);
  const [dishes,setDishes]=useState([])
  const [role,setRole]=useState("")
  async function getDishes(rId){
    const dishes=await fetch(`http://localhost:5000/getDishes/${rId}`,{credentials:"include"})
    const parsed= await dishes.json()
    console.log(parsed)
    if(parsed){setDishes(parsed)}
  }

  useEffect(()=>{
    
    async function getRestaurant(){
        console.log("fetching restaurant")
          const restaurantData=await fetch("http://localhost:5000/restaurant",{credentials:"include"})
          const parsed= await restaurantData.json()
          console.log(parsed)
          setRestaurant(parsed.simplified);setRole(parsed.role)

    }
    getRestaurant()

  },[])


  async function addCheckout(dish){
    console.log(dish)
    const payload={
      method:"POST",
      credentials:"include",
      headers: {
      "Content-Type": "application/json"
    },
      body:JSON.stringify(dish)
    }
    const sendData=await fetch("http://localhost:5000/addCart",payload)
    const response=await sendData.json()
    if(sendData.ok){
      alert("sucessfully added to cart",response)
    }

    
  }

  async function delCheckout(dish){
    console.log(dish)
    const payload={
      method:"POST",
      credentials:"include",
      headers: {
      "Content-Type": "application/json"
    },
      body:JSON.stringify(dish)
    }
    const sendData=await fetch("http://localhost:5000/delCart",payload)
    const response=await sendData.json()
    if(sendData.ok){
      alert("sucessfully removed from cart",response)
    }

    
  }
  return (
    <div className='absolute h-full w-full border border-black'>
        {/* navbar */}
        <div className="relative h-16 w-full flex justify-end items-center bg-white border-b border-black shadow px-4 space-x-4">
          <div className='relative right-100 text-xl '>Dashboard ({role})</div>
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


        {/* Resturants left side bar */}
       <div className="absolute top-16 left-0 h-[calc(100vh-4rem)] w-1/6 border-r border-black bg-gray-50 overflow-y-auto flex flex-col">
  {restaurant.map((val) => (
    <button
      key={val.rId}
      onClick={() => getDishes(val.rId)}
      className="w-full px-4 py-3 text-left border-b border-gray-300 hover:bg-gray-200 transition"
    >
      {val.name}
    </button>
  ))}
</div>

        {/* Recipes */}
<div className="absolute top-16 left-1/6 w-5/6 h-[calc(100vh-4rem)] border-l border-black overflow-y-auto p-6 bg-white flex flex-wrap gap-6">
  {dishes.map((dish) => (
    <div
      key={dish.dId}
      className="border border-black p-5 rounded-lg h-40 shadow-md w-64 bg-gray-50 flex flex-col items-center"
    >
      <p className="text-lg font-semibold">{dish.name}</p>
      <p className="text-gray-700 mb-2">₹{dish.price}</p>
      <div className="flex items-center gap-3 mt-2">
        <button
          disabled={dish.qty <= 0}
          onClick={() => {
            setDishes((prev) =>
              prev.map((val) =>
                dish.dId === val.dId && val.qty > 0
                  ? { ...val, qty: val.qty - 1 }
                  : val
              )
            );
            delCheckout({ ...dish, qty: dish.qty - 1 });
          }}
          className="px-3 py-1 bg-red-200 rounded hover:bg-red-300 disabled:opacity-50"
        >
          -
        </button>
        <p className="font-medium">{dish.qty}</p>
        <button
          onClick={() => {
            setDishes((prev) =>
              prev.map((val) =>
                dish.dId === val.dId ? { ...val, qty: val.qty + 1 } : val
              )
            );
            addCheckout({ ...dish, qty: dish.qty + 1 });
          }}
          className="px-3 py-1 bg-green-200 rounded hover:bg-green-300"
        >
          +
        </button>
      </div>
    </div>
  ))}
</div>


    </div>
  )
}

export default Dashboard