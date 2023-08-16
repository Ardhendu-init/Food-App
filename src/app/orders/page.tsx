import React from "react";

const OrdersPage = () => {
  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="text-left bg-red-500 text-white">
            <th className="hidden md:table-cell py-3 px-4">Order ID</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Price</th>
            <th className="hidden md:table-cell py-3 px-4">Products</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm md:text-base bg-red-50">
            <td className="hidden md:table-cell py-3 px-4">1237861238721</td>
            <td className="py-3 px-4">19.07.2023</td>
            <td className="py-3 px-4">$89.90</td>
            <td className="hidden md:table-cell py-3 px-4">
              Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
            </td>
            <td className="py-3 px-4">
              <span className="text-green-500">On the way</span> (approx.
              10min)...
            </td>
          </tr>
          <tr className="text-sm md:text-base odd:bg-gray-100">
            <td className="hidden md:table-cell py-3 px-4">1237861238721</td>
            <td className="py-3 px-4">19.07.2023</td>
            <td className="py-3 px-4">$89.90</td>
            <td className="hidden md:table-cell py-3 px-4">
              Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
            </td>
            <td className="py-3 px-4">
              <span className="text-green-500">On the way</span> (approx.
              10min)...
            </td>
          </tr>
          <tr className="text-sm md:text-base odd:bg-gray-100">
            <td className="hidden md:table-cell py-3 px-4">1237861238721</td>
            <td className="py-3 px-4">19.07.2023</td>
            <td className="py-3 px-4">$89.90</td>
            <td className="hidden md:table-cell py-3 px-4">
              Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
            </td>
            <td className="py-3 px-4">
              <span className="text-green-500">On the way</span> (approx.
              10min)...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
