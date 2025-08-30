import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  //  fetch parcels with tan stack
  const {
    data: parcel,
    isError,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isLoading)
    return <p className="text-center text-lg">Loading parcel ...</p>;
  if (isPending)
    return <p className="text-center text-lg">Pending parcel ...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load parcel.</p>;
  console.log(parcel);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    setError("");
    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("paymentMethod", paymentMethod);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <form action="" onSubmit={handleSubmit} className="space-y-3">
        <div className="p-3 border rounded-xl bg-gray-50">
          {" "}
          <CardElement options={{ style: { base: { fontSize: "17px" } } }}>
            {" "}
          </CardElement>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold shadow-md transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "processing..." : "pay for parcel"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
