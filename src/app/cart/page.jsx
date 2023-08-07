"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

function Cart() {
  const [openSizeModal, setOpenSizeModal] = useState(false);
  const [openQtyModal, setOpenQtyModal] = useState(false);
  const sizeModalRef = useRef(null);
  const QtyModalRef = useRef(null);

  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedQty, setSelectedQty] = useState(1);

  function closeSizeModal(e) {
    const modalDimensions = sizeModalRef.current.getBoundingClientRect();
    if (
      e.clientX < modalDimensions.left ||
      e.clientX > modalDimensions.right ||
      e.clientY < modalDimensions.top ||
      e.clientY > modalDimensions.bottom
    )
      setOpenSizeModal(false);
  }
  function closeQtyModal(e) {
    const modalDimensions = QtyModalRef.current.getBoundingClientRect();
    if (
      e.clientX < modalDimensions.left ||
      e.clientX > modalDimensions.right ||
      e.clientY < modalDimensions.top ||
      e.clientY > modalDimensions.bottom
    )
      setOpenQtyModal(false);
  }

  return (
    <div className="px-5 mt-5 max-w-7xl mx-auto">
      <h2 className="mb-5">
        <span className="font-bold lg:text-lg">My Bag</span> 1 item
      </h2>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-5 lg:w-3/5">
          <div className="border-2 rounded-md">
            <div className="flex gap-3 p-3 lg:p-5 lg:justify-between">
              <div className="flex flex-col gap-4">
                <h2 className="text-slate-500 lg:text-lg">
                  Men's White World Peace Graphic Printed T-shirt
                </h2>
                <h2 className="text-lg font-bold lg:text-xl">₹ 449</h2>
                <div className="flex gap-5">
                  <div
                    className="bg-slate-100 px-3 py-2 rounded-md flex items-center gap-1 cursor-pointer"
                    onClick={() => setOpenSizeModal(true)}
                  >
                    <h3>
                      Size: <span className="font-bold">{selectedSize}</span>
                    </h3>
                    <AiOutlineDown size={12} />
                  </div>
                  {openSizeModal && (
                    <div
                      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
                      onClick={closeSizeModal}
                    >
                      <ul
                        className="bg-white shadow-lg w-40"
                        ref={sizeModalRef}
                      >
                        <li className="text-center px-3 py-2 text-slate-500">
                          Select Size
                        </li>
                        {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                          <li
                            className="text-center p-3 hover:bg-gray-200 cursor-pointer"
                            key={size}
                            onClick={() => {
                              setSelectedSize(size);
                              setOpenSizeModal(false);
                            }}
                          >
                            {size}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div
                    className="bg-slate-100 px-3 py-2 rounded-md flex items-center gap-1 cursor-pointer"
                    onClick={() => setOpenQtyModal(true)}
                  >
                    <h3>
                      Qty: <span className="font-bold">{selectedQty}</span>
                    </h3>
                    <AiOutlineDown size={12} />
                  </div>
                  {openQtyModal && (
                    <div
                      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
                      onClick={closeQtyModal}
                    >
                      <ul className="bg-white shadow-lg w-40" ref={QtyModalRef}>
                        <li className="text-center px-3 py-2 text-slate-500">
                          Select Quantity
                        </li>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                          <li
                            className="text-center p-3 hover:bg-gray-200 cursor-pointer"
                            key={qty}
                            onClick={() => {
                              setSelectedQty(qty);
                              setOpenQtyModal(false);
                            }}
                          >
                            {qty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Image
                  src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/10307423/2019/11/7/7f8bf98e-96b3-490c-9512-dad6a7279feb1573110418783-Roadster-Men-Tshirts-241573110416534-1.jpg"
                  width={120}
                  height={0}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="flex border-t-2 text-slate-500">
              <span className="flex-1 border-r-2 text-center py-4">Remove</span>
              <span className="flex-[2] text-center py-4">
                Move to Wishlist
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-2/5 lg:border-2 h-fit">
          <div className="mb-24 lg:mb-0">
            <h2 className="uppercase font-bold bg-gray-200 pl-5 py-3">
              Price Summary
            </h2>
            <div className="px-5">
              <div className="flex justify-between py-5 border-b-2">
                <span>Total MRP (incl. of taxes)</span>
                <span>₹ 1099</span>
              </div>

              <div className="flex justify-between py-5 border-b-2">
                <span>Shipping Charges</span>
                <span className="text-green-600">FREE</span>
              </div>

              <div className="flex justify-between py-5 font-bold">
                <span>Subtotal</span>
                <span>₹ 449</span>
              </div>
            </div>
          </div>

          <div className="flex fixed bottom-0 left-0 right-0 py-4 px-3 shadow-2xl bg-white lg:static lg:shadow-none">
            <div className="flex-1 flex flex-col justify-center">
              <h2>Total</h2>
              <h3 className="text-lg font-bold">₹ 449</h3>
            </div>
            <span className="flex-[2] uppercase text-center py-4 bg-[#42A2A2] text-white font-bold rounded-lg">
              Proceed to checkout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
