import React, { memo } from 'react';
import { Button, Divider, TextField } from '@mui/material';
import { Apple, FaceBookColor, GoogleColor, TrelloIconColor } from '../../Components/Icons';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Signup } from '../../Services/API/Auth';

const borderStyle = 'border-[1px] border-[#8590A2] border-solid';

function SignUp(props) {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (values) => {
    const { email, password } = values;
    Signup('UserName', email, password)
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
              <h5 className="text-[16px] font-medium pt-6 text-center text-[var(--text-color)]">
                Register to continue
              </h5>
            </div>

            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col">
              <Controller
                name="email"
                control={form.control}
                render={(props) => (
                  <TextField
                    value={props.field.email}
                    onChange={props.field.onChange}
                    sx={{
                      marginBottom: 2,
                      '& .MuiInputBase-input': {
                        padding: 1,
                      },
                    }}
                    placeholder="Email"
                  />
                )}
              />

              <Controller
                control={form.control}
                name="password"
                render={(props) => (
                  <TextField
                    value={props.field.password}
                    onChange={props.field.onChange}
                    type="password"
                    sx={{
                      marginBottom: 2,
                      '& .MuiInputBase-input': {
                        padding: 1,
                      },
                    }}
                    placeholder="Password"
                  />
                )}
              />
              <Controller
                name="confirm_password"
                control={form.control}
                render={(props) => (
                  <TextField
                    value={props.field.confirmPassword}
                    onChange={props.field.onChange}
                    type="password"
                    sx={{
                      marginBottom: 2,
                      '& .MuiInputBase-input': {
                        padding: 1,
                      },
                    }}
                    placeholder="Confirm Password"
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
              <Link to={'/login'} className="text-[#0c66e4] text-[14px] hover:underline">
                Already have an Atlassian account? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SignUp.propTypes = {};

export default memo(SignUp);
