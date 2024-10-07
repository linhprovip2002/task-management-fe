import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({ children, width, height }) => {
  return (
    <div className={`bg-white mt-2 shadow-lg rounded-xl border-[1px] p- border-solid border-slate-200 max-h-[623px]`}>
      {children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
};

export default Wrapper;
