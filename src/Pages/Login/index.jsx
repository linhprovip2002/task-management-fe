import React, { memo } from 'react';
import Input from '@mui/joy/Input';
import { Button, Divider } from '@mui/joy';
import { Apple, FaceBookColor, GoogleColor } from '../../Components/Icons';
import { Link } from 'react-router-dom';

const Login = memo((props) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="mt-[50px] w-full flex justify-center">
        <div className="px-[40px] py-[32px] w-[400px] shadow-lg shadow-gray-300/50">
          <div>
            <h3 className="font-semibold">TRELLO</h3>
            <span className="text-[14px] font-medium">Đăng nhập để tiếp tục</span>
            <Input
              sx={{
                fontSize: 14,
                borderRadius: 4,
              }}
              type="email"
              placeholder="Nhập email của bạn"
              className="text-[14px] mb-2"
            />

            <Input
              sx={{
                fontSize: 14,
                borderRadius: 4,
              }}
              placeholder="Nhập mật khẩu"
              type="password"
              className="text-[14px] mb-2"
            />
            <Button sx={{ borderRadius: 4 }} className="w-full" variant="solid">
              Tiếp tục
            </Button>
            <div className="mt-6">
              <span className="mb-4 text-[14px] font-bold text-slate-400">Hoặc tiếp tục với:</span>
            </div>

            <div>
              <div className="h-10 w-full flex justify-center items-center gap-2 border-solid border-2 border-gray-300 cursor-pointer hover:bg-slate-50 mb-4">
                <GoogleColor />
                <span className="text-[14px] font-bold">Google</span>
              </div>
              <div className="h-10 w-full flex justify-center items-center gap-2 border-solid border-2 border-gray-300 cursor-pointer hover:bg-slate-50 mb-4">
                <FaceBookColor />
                <span className="text-[14px] font-bold">Facebook</span>
              </div>

              <div className="h-10 w-full flex justify-center items-center gap-2 border-solid border-2 border-gray-300 cursor-pointer hover:bg-slate-50 mb-4">
                <Apple />
                <span className="text-[14px] font-bold">Apple</span>
              </div>
            </div>
            <div className="my-4">
              <Divider variant="inset" component="li" />
            </div>
            <div className="flex">
              <Link className="text-[#0c66e4] text-[14px] hover:underline">Bạn không đăng nhập được ?</Link>
              <p className="text-[14px] text-[#42526E] mx-2">•</p>
              <Link to="/signup" className="text-[#0c66e4] text-[14px] hover:underline">
                Tạo tài khoản
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
