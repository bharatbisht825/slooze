import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function PaymentModal({ onSubmit, onClose,total,to,from,queeId,role}) {
  const [editPayment, enableEditPayments] = useState(false);
  const [payments, setPayments] = useState([
    { type: 'UPI', enable: true },
    { type: 'Credit Card', enable: true },
    { type: 'Debit Card', enable: false },
    { type: 'Cash on Delivery', enable: true },
    { type: 'Net Banking', enable: false },
    { type: 'Wallet', enable: true },
  ]);

  const orderQuee= async (type)=>{
    const submitOrder=fetch("http://localhost:5000/orderQuee",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({paymentMethod:type,queeId:queeId})
        
    })
    if(submitOrder){
        console.log ("order submiteed from quee")
    }



  }

  const orderCart= async (total,type)=>{
    const submitOrder=fetch("http://localhost:5000/order",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({total,paymentMethod:type,to})
        
    })
    if(submitOrder.ok){
        alert ("order submiteed")
    }
}


  const addMethod = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Add Payment Method</h2>
        <div className="flex flex-col gap-3">
          {payments.map((method) => {
            if (!method.enable) {
              return (
                <button
                  key={method.type}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => {
                    setPayments((prev) =>
                      prev.map((val) =>
                        val.type === method.type ? { ...val, enable: true } : val
                      )
                    );
                  }}
                >
                  {method.type}
                </button>
              );
            }
            return null;
          })}
        </div>
        <button
          onClick={() => enableEditPayments(false)}
          className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-white border border-gray-300 shadow-xl rounded-lg p-6 z-40 flex flex-col items-center justify-between">
      <h1 className="text-2xl font-bold mb-4">Select Payment Method</h1>
        <h2 className="text-2xl font-bold mb-4">Total:{total}</h2>
      <div className="flex flex-wrap gap-4 overflow-y-auto max-h-96 p-4 border border-gray-200 rounded-lg w-full justify-center">
        {payments.map((method) =>
          method.enable ? (
            <button
                onClick={()=>{
                    from=="checkout"?orderCart(total,method.type):orderQuee(method.type);
                    onSubmit()

                     
                }}
              key={method.type}
              className="px-4 py-2 bg-green-100 border border-green-400 rounded shadow"
            >
              {method.type}
            </button>
          ) : null
        )}
        <button
            disabled={role=="member" || role =="manager"}
          onClick={() => enableEditPayments(true)}
          className="px-4 py-2 border border-dashed border-blue-400 text-blue-500 rounded hover:bg-blue-50"
        >
          + Add Method
        </button>
      </div>

      <button
        onClick={onClose}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close
      </button>

      {editPayment && addMethod()}
    </div>,
    document.getElementById('modal')
  );
}

export default PaymentModal;
