import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading payment history...</p>;
  }

  if (payments.length === 0) {
    return <p className="text-center py-10 text-gray-500">No payments found.</p>;
  }

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        💳 Payment History
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full shadow-md rounded-lg">
          <thead className="bg-secondary text-white">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Amount ($)</th>
              <th>Currency</th>
              <th>Transaction ID</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>
                <td>{payment.parcelId}</td>
                <td>{(payment.amount / 100).toFixed(2)}</td>
                <td>{payment.currency.toUpperCase()}</td>
                <td>{payment.transactionId}</td>
                <td>{new Date(payment.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
