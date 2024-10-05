import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import Input from '@mui/joy/Input';
import { Button, Divider, FormControl, FormHelperText } from '@mui/joy';
import { Link } from 'react-router-dom';
import { InfoOutlined } from '@mui/icons-material';
import { Apple, FaceBookColor, GoogleColor } from '../../Components/Icons';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (confirmPassword !== password) setError('Password is not match');
  };

  return (
    <div className="sign-up">
      <div className="w-full h-full flex items-center justify-center">
        <div className="mt-[50px] w-full flex justify-center">
          <div className="px-[40px] py-[32px] w-[400px] shadow-lg shadow-gray-300/50">
            <div>
              <h3 className="font-semibold">TRELLO</h3>
              <span className="text-[14px]">Đăng ký để tiếp tục</span>

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  fontSize: 14,
                  borderRadius: 4,
                }}
                type="email"
                placeholder="Nhập email của bạn"
                className="text-[14px] mb-2"
              />

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  fontSize: 14,
                  borderRadius: 4,
                }}
                placeholder="Nhập mật khẩu"
                type="password"
                className="text-[14px] mb-2"
              />

              <FormControl className="mb-2" error={error !== ''}>
                <Input
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (e.target.value !== password) setError('Password is not match');
                    else setError('');
                  }}
                  sx={{
                    fontSize: 14,
                    borderRadius: 4,
                  }}
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  className="text-[14px]"
                />

                {error && (
                  <FormHelperText>
                    <InfoOutlined />
                    {error}
                  </FormHelperText>
                )}
              </FormControl>

              <p className="text-[12px]">
                Bằng việc đăng ký, tôi chấp nhận Điều khoản dịch vụ của Atlassian Cloud và công nhận Chính sách quyền
                riêng tư.
              </p>
              <Button onClick={handleSignUp} sx={{ borderRadius: 4 }} className="w-full" variant="solid">
                Đăng ký
              </Button>

              <div className="mt-6 text-center">
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
                <Link to="/login" className="text-[#0c66e4] text-[14px] hover:underline">
                  Bạn đã có tài khoản Atlassian? Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SignUp.propTypes = {};

export default SignUp;
