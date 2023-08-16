// components/Notification.tsx

import React from "react";

const Notification: React.FC = () => {
  return (
    <div className="h-12 bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 flex items-center justify-center text-center text-sm md:text-lg font-medium cursor-pointer">
      <p>🍕 Free Delivery for all orders over ₹500. Order Your Pizza Now! 🍕</p>
    </div>
  );
};

export default Notification;
