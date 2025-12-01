import React from 'react';
import { Navigate } from 'react-router-dom';

const Booking: React.FC = () => {
  // Redirect to the new Booking/Contact page
  return <Navigate to="/contact" replace />;
};

export default Booking;