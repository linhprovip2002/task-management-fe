import React, { memo } from 'react';
import { Button, Divider, TextField } from '@mui/material';
import { Apple, FaceBookColor, GoogleColor, TrelloIconColor } from '../../Components/Icons';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Signin } from '../../Services/API/Auth';

const borderStyle = 'border-[1px] border-[#8590A2] border-solid';

const Login = memo((props) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values) => {
    const { email, password } = values;
    Signin(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="mt-[50px] w-full flex justify-center">
        <div className="px-[40px] py-[32px] w-[400px] shadow-lg shadow-gray-300/50">
          <div>
            <div className="mb-4">
              <div className="flex justify-center">
                <TrelloIconColor />
              </div>
              <h5 className="text-[16px] font-medium pt-6 text-center text-[var(--text-color)]">Login to continue</h5>
            </div>

            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col">
              <Controller
                name="email"
                control={form.control}
                render={(props) => (
                  <TextField
                    onChange={props.field.onChange}
                    value={props.field.email}
                    sx={{
                      '& .MuiInputBase-input': {
                        padding: 1,
                      },
                    }}
                    placeholder="Input your email"
                  />
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={(props) => (
                  <TextField
                    onChange={props.field.onChange}
                    type="password"
                    sx={{
                      marginY: 2,
                      '& .MuiInputBase-input': {
                        padding: 1,
                      },
                    }}
                    placeholder="Input your password"
                  />
                )}
              />

              <Button type="submit" variant="contained">
                Continue
              </Button>
            </form>
            <div className="mt-6">
              <span className="mb-4 text-[14px] font-bold text-slate-400">Others:</span>
            </div>

            <div>
              <div
                className={`h-10 w-full flex justify-center items-center gap-2 ${borderStyle} cursor-pointer hover:bg-slate-50 mb-4 rounded-sm`}
              >
                <GoogleColor width={24} height={24} />
                <span className="text-[14px] font-bold">Google</span>
              </div>
              <div
                className={`h-10 w-full flex justify-center items-center gap-2 ${borderStyle} cursor-pointer hover:bg-slate-50 mb-4 rounded-sm`}
              >
                <FaceBookColor width={24} height={24} />
                <span className="text-[14px] font-bold">Facebook</span>
              </div>

              <div
                className={`h-10 w-full flex justify-center items-center gap-2 ${borderStyle} cursor-pointer hover:bg-slate-50 mb-4 rounded-sm`}
              >
                <Apple width={24} height={24} />
                <span className="text-[14px] font-bold">Apple</span>
              </div>
            </div>
            <div className="my-4">
              <Divider component="div" />
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
