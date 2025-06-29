import React, { useEffect, useState } from 'react';
import PaymentModal from './PaymentModal';
import { Link } from 'react-router-dom';

function Quee() {
  const [queue, setQueue] = useState(null);
  const [payment, startPayment] = useState(false);
  const [queeId, setQueeId] = useState('');
  const [role, setRole] = useState('');
  const [total, setTotal] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getQueeData() {
      try {
        const queeData = await fetch("http://localhost:5000/getQuee", {
          credentials: "include",
        });
        const parsedData = await queeData.json();
        setQueue(parsedData.entries);
        setRole(parsedData.role);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    }

    getQueeData();
  }, []);

  return (
    <div className="p-6 w-full">
      {/* ✅ Always show navbar */}
      <div className="relative h-16 w-full flex justify-end items-center bg-white border-b border-black shadow px-4 space-x-4">
        <div className='relative right-100 text-xl'>Checkout Quee ({role})</div>
        <Link to="/dashboard" className="border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">Home</Link>
        <Link to="/quee" className="border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">Quee</Link>
        <Link to="/checkout" className="border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">Checkout</Link>
        <Link to="/orders" className="border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">Orders</Link>
      </div>

      {/* ⏳ Conditional content */}
      {loading ? (
        <div className="p-6 text-gray-500 text-lg">Loading...</div>
      ) : !queue?.cart ? (
        <div className="p-6 text-red-500 text-lg">No queue data available.</div>
      ) : (
        <div className="h-[700px] overflow-y-auto p-4 bg-gray-50 rounded-lg shadow-inner">
          <div className="bg-white border border-gray-300 rounded-lg p-5 mb-5 shadow-md">
            <div className="mb-2 font-semibold text-lg text-gray-800">Country: {queue.userCountry}</div>
            <div className="mb-2 text-gray-700">Order by: {queue.orderBy}</div>
            <div className="mb-2 text-gray-700">Client Name: {queue.orderFor}</div>
            <div className="mb-2 text-gray-700">Address: {queue.address}</div>
            <div className="mb-2 font-semibold">Cart Items:</div>
            <ul className="list-disc pl-6 mb-3 text-gray-700">
              {queue.cart.map((c, idx) => (
                <li key={idx}>
                  {c.name} - {c.qty} x ₹{c.price} = ₹{(c.qty * c.price).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="font-semibold text-gray-900 mb-4">
              Total: ₹{queue.cart.reduce((sum, c) => sum + c.qty * c.price, 0).toFixed(2)}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setQueeId(queue.queeId);
                  setTotal(queue.cart.reduce((sum, c) => sum + c.qty * c.price, 0).toFixed(2));
                  startPayment(true);
                }}
                disabled={role === "member"}
                className={`px-4 py-2 rounded text-white transition ${
                  role === "member" ? "bg-gray-300 cursor-not-allowed" : "bg-green-600"
                }`}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {payment && (
        <PaymentModal
          role={role}
          queeId={queeId}
          total={total}
          onClose={() => {
            startPayment(false);
            window.location.reload();
          }}
          onSubmit={() => {
            startPayment(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}

export default Quee;
