import React from 'react';
import { useSelector } from 'react-redux';

import './Alert.css';

const Alert = () => {
  const alertManager = useSelector((state) => state.alertManager);
  const { alerts } = alertManager;
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};

export default Alert;
