import React, { useEffect, useState } from 'react';
import PaymentModal from './PaymentModal';
import { Link } from 'react-router-dom';
function Checkout() {
  const [checkout, setCheckout] = useState([]);
  const [payment, startPayment] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [role,setRole]=useState("")  


  useEffect(() => { 
    getCart(); 


}, []);

  async function getCart() {
    const reciveData = await fetch("http://localhost:5000/getCart", { credentials: "include" });
    const response = await reciveData.json();
    setCheckout(response.result);
    setRole(response.role)
    if (reciveData.ok) {
      console.log("successfully got data to cart ", response);
    }
  }


const totalAmount = checkout.reduce((acc, order) => acc + Number(order.qty) * Number(order.price), 0).toFixed(2);
const gstAmount = checkout.reduce((acc, order) => acc + (Number(order.qty) * Number(order.price) * 5) / 100, 0).toFixed(2);

  async function addToQuee(){
       const obj= {orderFor:name, cart:checkout, total:totalAmount, address:address }
       const sendToQuee= await fetch("http://localhost:5000/addQuee",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
       })
       if(sendToQuee.ok){
        window.location.reload();

       }

  }

  
  return (
    <div className='w-full h-full'>
        <div className="relative h-16 w-full flex justify-end items-center bg-white border-b border-black shadow px-4 space-x-4">
              <div className='relative right-100 text-xl '>Checkout ({role})</div>

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
        {/* left food data */}
      <div className="absolute top-16  h-[92%] w-4/6 overflow-y-auto px-4 py-6 bg-gray-50 border border-black rounded-md shadow-inner">
            {checkout.map((order, ind) => (
                <div
                key={ind}
                className="w-full max-w-xl mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white flex flex-col"
                >
                <p className="text-lg font-bold text-gray-800">
                    Restaurant ID: <span className="font-normal">{order.rId.split("-")[1]}</span>
                </p>
                <p className="text-md text-gray-700 mt-1">{order.name}</p>
                <p className="text-sm text-gray-600 mt-2">
                    Qty: <span className="font-semibold">{order.qty}</span>
                </p>
                </div>
            ))}
            </div>

      <div className='border border-black absolute left-4/6 top-16 w-2/6 h-[92%] flex flex-col justify-between p-2'>
        <div className="overflow-y-auto max-h-80">
          <table className="w-full table-auto border border-gray-300 rounded-lg shadow-md">
            <thead className="text-left">
              <tr>
                <th className="px-4 py-2 border-b">Order</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Qty</th>
                <th className="px-4 py-2 border-b">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {checkout.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    <div className="font-semibold">{order.rId.split("-")[1]}</div>
                    <div className="text-sm text-gray-600">{order.name}</div>
                  </td>
                  <td className="px-4 py-2 border-b">₹{order.price}</td>
                  <td className="px-4 py-2 border-b">{order.qty}</td>
                  <td className="px-4 py-2 border-b">₹{Number(order.price) * Number(order.qty)}</td>
                </tr>
              ))}
              <tr className="bg-yellow-50 font-medium">
                <td className="px-4 py-2 border-t">GST (5%)</td>
                <td className="px-4 py-2 border-t"></td>
                <td className="px-4 py-2 border-t"></td>
                <td className="px-4 py-2 border-t">₹{gstAmount}</td>
              </tr>
              <tr className="bg-green-50 font-bold">
                <td className="px-4 py-2 border-t">Total</td>
                <td className="px-4 py-2 border-t"></td>
                <td className="px-4 py-2 border-t"></td>
                <td className="px-4 py-2 border-t">₹{totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Order Details</h3>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <textarea
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={()=>addToQuee()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Add to Quee
          </button>
          <button
            onClick={() => startPayment(true)}
            disabled={role === "member" || checkout.length==0}
            className={`bg-blue-600 text-white px-6 py-2 rounded ${
              role === "member"
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600"
            }`}
          >
            Pay
          </button>
        </div>
      </div>

      {payment && (
        <PaymentModal
          total={totalAmount}
          to={name}
          onClose={() => {startPayment(false);window.location.reload()}}
          onSubmit={() => {startPayment(false);window.location.reload()}}
          from={"checkout"}
          role={role}
        />
      )}
    </div>
  );
}

export default Checkout;
