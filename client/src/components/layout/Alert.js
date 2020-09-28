import React from 'react';
import { connect } from 'react-redux';

import './Alert.css';

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
  <div
    ket={alert.id}
    className={`alert alert-${alert.alertType}`}>
    {alert.msg}
  </div>
));

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);