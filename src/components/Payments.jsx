import React, { useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([
    { id: 1, amount: 500, status: "Unpaid" },
    { id: 2, amount: 1500, status: "Paid" },
  ]);

  const togglePaymentStatus = (id) => {
    setPayments(payments.map((payment) => (payment.id === id ? { ...payment, status: payment.status === "Paid" ? "Unpaid" : "Paid" } : payment)));
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Payments</h2>
      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="flex justify-between items-center bg-gray-50 p-4 rounded">
            <div>
              <p className="text-sm font-semibold">${payment.amount}</p>
              <p className={`text-sm ${payment.status === "Paid" ? "text-green-500" : "text-red-500"}`}>{payment.status}</p>
            </div>
            <button onClick={() => togglePaymentStatus(payment.id)} className="text-blue-500 hover:underline text-sm">
              Mark as {payment.status === "Paid" ? "Unpaid" : "Paid"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
