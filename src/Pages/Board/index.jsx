import React from 'react';
import { Link } from 'react-router-dom';

function Board(props) {
  return (
    <>
      <Link component={Link} className="cursor-pointer">
        <div className="relative ">
          <div className="grid absolute w-full h-full rounded-b-[1.3rem]"></div>
          <div className="flex ">
            {/* Background */}
            <img
              src={'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-thien-nhien-dep-3d-22.jpg'}
              alt="khong gian 1"
              className="object-cover lg:w-[200px] lg:h-[112px] rounded-md sm:h-[17rem] md:h-[240px] w-full"
            />
          </div>
        </div>
        {/* Description */}
        <div className="py-2">
          <p className="text-[14px] text-[#44546f] font-normal">BKDN</p>
        </div>
      </Link>
    </>
  );
}

Board.propTypes = {};

export default Board;
