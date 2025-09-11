import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();

  // fetch parcel data
  const {
    data: parcel,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading parcel...</p>;
  if (isError) return <p className="text-red-500">Failed to load parcel.</p>;

  const { totalCost } = parcel;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const card = elements.getElement(CardElement);
    if (!card) return;

    // 1. Create payment method
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: user?.displayName || "Anonymous",
        email: user?.email,
      },
    });

    if (pmError) {
      setError(pmError.message);
      setLoading(false);
      return;
    }

    // 2. Request backend to create payment intent
    const res = await axiosSecure.post("/create-payment-intent", { parcelId });
    const clientSecret = res.data.clientSecret;

    // 3. Confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setError(confirmError.message);
      setLoading(false);
      return;
    }

    // 4. If success, save payment history & update parcel
    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        parcelId,
        userEmail: user.email,
        amount: paymentIntent.amount, // in cents
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        transactionId: paymentIntent.id,
      };

      await axiosSecure.post("/payments", paymentData);

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: `You paid $${(paymentIntent.amount / 100).toFixed(2)}`,
      });

      navigate("/dashboard/my-parcels"); // redirect back to parcels
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="p-3 border rounded-xl bg-gray-50">
          <CardElement options={{ style: { base: { fontSize: "17px" } } }} />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-primary hover:bg-primary/90 text-white text-xl py-3 rounded-xl font-semibold shadow-md transition disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay $${totalCost}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
