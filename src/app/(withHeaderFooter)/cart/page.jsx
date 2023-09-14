"use client";

import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem";
import Image from "next/image";
import nothingInBag from "../../../../public/nothingInBag.png";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Cart() {
  const [isClient, setIsClient] = useState(false);
  console.log("isClient ", isClient);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  if (typeof window !== "undefined") {
    var jwt = localStorage.getItem("jwt");
  }
  const router = useRouter();

  const { totalItems, totalMRP, totalprice } = cart.reduce(
    (totals, item) => {
      totals.totalItems += item.qty;
      totals.totalMRP += item.mrp * item.qty;
      totals.totalprice += item.price * item.qty;
      return totals;
    },
    { totalItems: 0, totalMRP: 0, totalprice: 0 }
  );

  const discount = totalMRP - totalprice;
  useEffect(() => {
    setIsClient(true);
  }, []);

  async function handleCheckout() {
    if (!jwt) {
      router.replace("/login?ref=/cart");
      return;
    }
    const response = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL + "/api/orders",
      {
        method: "POST",
        body: JSON.stringify({
          products: cart,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: jsonData.stripeSession.id,
    });
  }

  if (!isClient) return <div className="min-h-[calc(100vh-64px)]"></div>;

  return cart.length > 0 ? (
    <div className="px-5 mt-5 max-w-7xl mx-auto">
      <h2 className="mb-5">
        <span className="font-bold lg:text-lg">My Bag</span> {totalItems} item
        {totalItems > 1 && "(s)"}
      </h2>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-5 lg:w-3/5">
          {cart?.map((item) => (
            <CartItem {...item} key={item.id} />
          ))}
        </div>

        <div className="lg:w-2/5 lg:border-2 h-fit">
          <div className="mb-24 lg:mb-0">
            <h2 className="uppercase font-bold bg-gray-200 pl-5 py-3">
              Price Summary
            </h2>
            <div className="px-5">
              <div className="flex justify-between py-5 border-b-2">
                <span>Total MRP (incl. of taxes)</span>
                <span>₹{totalMRP}</span>
              </div>

              <div className="flex justify-between py-5 border-b-2">
                <span>Shipping Charges</span>
                <span className="text-green-600">FREE</span>
              </div>

              <div className="flex justify-between py-5 border-b-2">
                <span>Bag Discount</span>
                <span>- ₹{discount}</span>
              </div>

              <div className="flex justify-between py-5 font-bold">
                <span>Subtotal</span>
                <span>₹{totalprice}</span>
              </div>
            </div>
          </div>

          <div className="flex fixed bottom-0 left-0 right-0 py-4 px-3 shadow-2xl bg-white lg:static lg:shadow-none">
            <div className="flex-1 flex flex-col justify-center">
              <h2>Total</h2>
              <h3 className="text-lg font-bold">₹ {totalprice}</h3>
            </div>
            <span
              className="flex-[2] cursor-pointer uppercase text-center py-4 bg-[#42A2A2] text-white font-bold rounded-lg"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <div className="flex flex-col gap-3 items-center">
        <Image
          src={nothingInBag}
          width={150}
          height={0}
          alt="nothing in the bag"
        />
        <h2 className="text-lg">Nothing in the bag</h2>
        <Link href="/">
          <div className="text-xl border-2 border-[#51cccc] py-2 px-3 rounded-md text-[#51cccc] font-medium cursor-pointer">
            Continue Shopping
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
