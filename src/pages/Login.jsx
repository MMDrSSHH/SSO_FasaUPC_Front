import React from "react";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { useNavigate, useSearchParams } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const navigateToSignupHandler = () => {
    const queryStrings = searchParams.toString();

    navigate(`/signup?${queryStrings}`);
  };

  return (
    <>
      <div className="h-screen bg-slate-300 sm:flex sm:justify-center sm:items-center">
        <div className="h-full bg-slate-100 sm:w-[600px] sm:h-fit sm:rounded-2xl">
          <div className="flex flex-col justify-between sm:gap-16 py-8 px-4 h-full">
            <div>
              <h1 className="mb-16 text-5xl text-slate-800 leading-20 font-sahel font-bold border-b border-slate-400 pb-2">
                ورود
              </h1>
              
              {/* Input field */}
              <div className="flex flex-col gap-8">
                <Input
                  label="شناسه کاربری"
                  placeholder="شماره ملی، شماره دانشجویی یا تلفن همراه"
                />
                <Input
                  label="رمز عبور"
                  placeholder="رمز عبور خود را وارد کنید"
                  type="password"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Button label="ورود" onClick={() => {}} className="w-full" />
              <div className="flex items-center gap-2 flex-col w-full">
                <span>حساب کاربری ندارید؟</span>
                <Button
                  className="self-stretch"
                  label="ثبت نام"
                  onClick={navigateToSignupHandler}
                  type="outline"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
