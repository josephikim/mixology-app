import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

import { useAppDispatch } from '../hooks';
import { deleteAlert, IAlert } from '../store/alertSlice';

interface CustomAlertProps {
  data: IAlert;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(true);

  const handleClose = (): void => {
    const payload = data as IAlert;

    setShow(false);
    dispatch(deleteAlert(payload));
  };

  return (
    <div className="CustomAlert">
      <Alert key={data.type} show={show} variant="danger">
        <p>{data.message}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => handleClose()} variant="light">
            Close
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default CustomAlert;
