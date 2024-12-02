import React, { useState } from "react";

const Payments = ({ payments, setPayments }) => {
  const [newPayment, setNewPayment] = useState({ amount: '', status: 'Unpaid' });

  const notifyPaymentsUpdate = () => {
    // Dispatch custom event to notify of payments update
    window.dispatchEvent(new Event('paymentsUpdated'));
  };

  const addPayment = () => {
    if (newPayment.amount) {
      const newPaymentWithId = { 
        ...newPayment, 
        id: Date.now(),
        status: 'Unpaid',
        amount: Number(newPayment.amount)
      };
      
      setPayments(prevPayments => {
        const updatedPayments = [...prevPayments, newPaymentWithId];
        localStorage.setItem('payments', JSON.stringify(updatedPayments));
        notifyPaymentsUpdate();
        return updatedPayments;
      });
      
      setNewPayment({ amount: '', status: 'Unpaid' });
    }
  };

  const togglePaymentStatus = (id) => {
    setPayments(prevPayments => {
      const updatedPayments = prevPayments.map((payment) => 
        payment.id === id 
          ? { 
              ...payment, 
              status: payment.status === "Paid" ? "Unpaid" : "Paid",
              amount: Number(payment.amount)
            } 
          : payment
      );
      localStorage.setItem('payments', JSON.stringify(updatedPayments));
      notifyPaymentsUpdate();
      return updatedPayments;
    });
  };

  const handleDeletePayment = (paymentId) => {
    setPayments(prevPayments => {
      const updatedPayments = prevPayments.filter(payment => payment.id !== paymentId);
      localStorage.setItem('payments', JSON.stringify(updatedPayments));
      notifyPaymentsUpdate();
      return updatedPayments;
    });
  };

  // Add payment form JSX at the bottom of the component
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Payments</h2>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {payments.length} Payments
        </div>
      </div>
      
      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} 
            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-800">${payment.amount}</span>
                {payment.status === "Paid" && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    Paid
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{payment.projectName}</p>
              <p className={`text-sm ${
                payment.status === "Paid" 
                  ? "text-green-600" 
                  : "text-amber-600"
              }`}>
                {payment.status}
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => togglePaymentStatus(payment.id)} 
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                  ${payment.status === "Paid"
                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
              >
                Mark as {payment.status === "Paid" ? "Unpaid" : "Paid"}
              </button>
              <button
                onClick={() => handleDeletePayment(payment.id)}
                className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Add Payment Form */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Amount"
              value={newPayment.amount}
              onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
              className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addPayment}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg px-6 py-3 hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Add Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
