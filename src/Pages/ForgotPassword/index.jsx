import { memo, useState } from "react";
import { Button, Divider, TextField } from "@mui/material";
import { TrelloIconColor } from "../../Components/Icons";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Loading from "../../Components/Loading";
import routes from "../../config/routes";
import "./ForgotPassword.css";
import { joiResolver } from "@hookform/resolvers/joi";
import validation from "./validation";
import { requestForgotPassowrd } from "../../Services/API/Auth";

const ForgotPassword = memo(() => {
  const [isLoading, setLoading] = useState(false);
  const [sentMail, setSentMail] = useState(false);
  const { handleSubmit, control, getValues, setError } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: joiResolver(validation),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onLogin = (values) => {
    const { email } = values;

    setLoading(true);
    requestForgotPassowrd(email)
      .then((res) => {
        setSentMail(true);
      })
      .catch((err) => {
        setError("email", { type: "manual", message: err.response?.data?.message || err.message });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="forgotPassword_background"></div>
      <div className="px-[40px] py-[32px] w-[400px] shadow-lg shadow-gray-300/50">
        <div>
          <div className="mb-4">
            <div className="flex justify-center">
              <TrelloIconColor />
            </div>
            <h5 className="text-[16px] font-medium pt-6 text-center text-[var(--text-color)]">You can't Login ?</h5>
          </div>
          {sentMail || (
            <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-3">
              <div className="text-sm text-[var(--dark-slate-blue)] font-semibold">We will send the link to</div>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    onChange={field.onChange}
                    value={field.email}
                    error={Boolean(error)} // Hiển thị lỗi nếu có
                    helperText={error ? error.message : ""} // Hiển thị thông báo lỗi
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: 1,
                      },
                    }}
                    placeholder="Input your email"
                  />
                )}
              />

              <Button
                sx={{
                  textTransform: "none",
                }}
                type="submit"
                variant="contained"
              >
                Send recover link
              </Button>
            </form>
          )}
          {sentMail && (
            <>
              <div
                style={{
                  background: `url(https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/check-your-email-open-letter.58fc87ea.svg) center bottom no-repeat`,
                  height: 88,
                  margin: `8px 0px 16px`,
                }}
              ></div>
              <p className="text-sm text-[var(--dark-slate-blue)]">We have sent you a recover link at</p>
              <p className="text-base font-semibold text-[var(--text-color)]">{getValues("email")}</p>
              <p className="text-xs text-[var(--dark-slate-blue)]">
                If you haven't received the email, please check your spam folder or{" "}
                <Link to={routes.signup} className="text-[var(--primary)] hover:underline">
                  subscribe
                </Link>
                .
              </p>
              <div className="flex justify-center mt-6">
                <div
                  onClick={() => setSentMail(false)}
                  className="text-[#0c66e4] text-[14px] hover:underline cursor-pointer"
                >
                  Go back
                </div>
                <p className="text-[14px] text-[#42526E] mx-2">•</p>
                <Link className="text-[#0c66e4] text-[14px] hover:underline">Resend recover link</Link>
              </div>
            </>
          )}

          <div className="my-4">
            <Divider />
          </div>

          <div className="flex justify-center">
            <Link to={routes.login} className="text-[#0c66e4] text-[14px] hover:underline">
              Go back Login
            </Link>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
});

export default ForgotPassword;
