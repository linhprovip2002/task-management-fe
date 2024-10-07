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
            <span className="text-[14px] font-medium">Login to continue</span>
            <Input
              sx={{
                fontSize: 14,
                borderRadius: 4,
              }}
              type="email"
              placeholder="Your email"
              className="text-[14px] mb-2"
            />

            <Input
              sx={{
                fontSize: 14,
                borderRadius: 4,
              }}
              placeholder="Password"
              type="password"
              className="text-[14px] mb-2"
            />
            <Button sx={{ borderRadius: 4 }} className="w-full" variant="solid">
              Continue
            </Button>
            <div className="mt-6">
              <span className="mb-4 text-[14px] font-bold text-slate-400">Others:</span>
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
              <Link className="text-[#0c66e4] text-[14px] hover:underline">You can't login ?</Link>
              <p className="text-[14px] text-[#42526E] mx-2">•</p>
              <Link to="/signup" className="text-[#0c66e4] text-[14px] hover:underline">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
