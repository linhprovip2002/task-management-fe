import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import Input from '@mui/joy/Input';
import { Button, Divider, FormControl, FormHelperText } from '@mui/joy';
import { Link } from 'react-router-dom';
import { InfoOutlined } from '@mui/icons-material';

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
              <Button onClick={handleSignUp} sx={{ borderRadius: 4 }} className="w-full" variant="solid">
                Đăng ký
              </Button>

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
