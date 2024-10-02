import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function BoardLayout({ children }) {
  return (
    <div>
      <Header />
      {/* content  */}
      <div className="flex">
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}

BoardLayout.propTypes = {};

export default BoardLayout;
