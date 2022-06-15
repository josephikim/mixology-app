import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

import { useAppDispatch } from 'hooks';
import { deleteAlert, IAlert } from 'store/alertSlice';

import 'styles/CustomAlert.css';
interface CustomAlertProps {
  data: IAlert;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(true);

  const handleClose = (): void => {
    const alertId = data.id;

    setShow(false);
    dispatch(deleteAlert({ id: alertId }));
  };

  return (
    <div className="CustomAlert">
      {data.type.endsWith('rejected') ? (
        <Alert show={show} variant="danger">
          <span>{data.message}</span>
          <Button onClick={() => handleClose()} variant="light">
            Close
          </Button>
        </Alert>
      ) : (
        <Alert show={show} variant="success">
          <span>{data.message}</span>
          <Button onClick={() => handleClose()} variant="light">
            Close
          </Button>
        </Alert>
      )}
    </div>
  );
};

export default CustomAlert;
