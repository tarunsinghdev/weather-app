import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner__content">
        <Loader
          type="TailSpin"
          color="white"
          height={70}
          width={70}
          timeout={30000}
        />
        <div className="spinner__text">Please accept location request</div>
      </div>
    </div>
  );
};

export default Spinner;
