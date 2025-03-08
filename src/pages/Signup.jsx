import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SignupSchema from "../utils/validators/signup.validator";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Dropzone from "react-dropzone";
import QuestionMarkImg from "../assets/images/Questions-pana.png";
import { StorageKey } from "../utils/constants/DataKey";
import useFetch from "../hooks/useFetch";
import AuthService from "../services/AuthService";

const signupSchema = new SignupSchema();

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const swiperRef = useRef(null);
  const personalDataForm = useForm({
    resolver: joiResolver(signupSchema.getPersonalDataSchema()),
  });
  const userDataForm = useForm({
    resolver: joiResolver(signupSchema.getUserDataSchema()),
  });
  const dropzoneRef = useRef(null);
  const [studentCardImgPreview, setStudentCardImgPreview] = useState(null);
  const [signupData, setSignupData] = useState({
    clientId: "Fwgewg",
    clientUri: "wegwgg",
  });
  const { fetchData } = useFetch(new AuthService().signup);

  const navigateToLoginHandler = () => {
    const queryStrings = searchParams.toString();

    navigate(`/login?${queryStrings}`);
  };

  const signupHandler = async () => {
    await fetchData({
      ...signupData,
      clientId: searchParams.get("clientId"),
      clientUri: searchParams.get("clientUri"),
    });
  };

  const saveToSessionStorage = (newData) => {
    const savedData = JSON.parse(
      window.sessionStorage.getItem(StorageKey.SignupData)
    );
    window.sessionStorage.setItem(
      StorageKey.SignupData,
      JSON.stringify({ ...savedData, ...newData })
    );
  };

  const handlePersonalDataSubmit = (data) => {
    setCurrentStep(1);
    saveToSessionStorage(data);
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const handleUserDataSubmit = (data) => {
    setCurrentStep(2);
    saveToSessionStorage(data);
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const nextStepHandler = () => {
    switch (currentStep) {
      case 0:
        return personalDataForm.handleSubmit(handlePersonalDataSubmit)();
      case 1:
        return userDataForm.handleSubmit(handleUserDataSubmit)();
      case 2:
        signupHandler();
    }
  };

  const openFileDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const fileSelectHandler = (acceptedFiles) => {
    const file = acceptedFiles[0];

    setSignupData((prev) => ({ ...prev, studentCard: file }));
    setStudentCardImgPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    swiperRef.current?.swiper.slideTo(currentStep);
  }, [currentStep]);

  return (
    <>
      <div className="h-screen sm:min-h-screen bg-slate-300 sm:flex sm:justify-center sm:items-center">
        <div className="h-full bg-slate-100 sm:w-[600px] sm:h-fit sm:rounded-2xl">
          <div className="flex flex-col justify-between sm:gap-16 py-8 px-4 h-full">
            <div>
              <h1 className="mb-16 text-5xl text-slate-800 leading-20 font-sahel font-bold border-b border-slate-400 pb-2">
                ثبت نام
              </h1>

              <Swiper
                ref={swiperRef}
                autoHeight
                spaceBetween={48}
                allowTouchMove={false}
              >
                <SwiperSlide>
                  {/* Input field */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8">
                    <Input
                      tabIndex={currentStep === 0 ? null : -1}
                      label="نام"
                      placeholder="محمدرضا"
                      {...personalDataForm.register("firstName")}
                    />
                    <Input
                      tabIndex={currentStep === 0 ? null : -1}
                      label="نام خانوادگی"
                      placeholder="شکوهی"
                      {...personalDataForm.register("lastName")}
                    />
                    <Input
                      tabIndex={currentStep === 0 ? null : -1}
                      label="کدملی"
                      placeholder="256..."
                      {...personalDataForm.register("nationalCode")}
                    />
                    <Input
                      tabIndex={currentStep === 0 ? null : -1}
                      label="شماره دانشجویی"
                      placeholder="43111..."
                      {...personalDataForm.register("studentNo")}
                    />
                    {/* TODO: Data picker */}
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {/* Input field */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8">
                    <Input
                      tabIndex={currentStep === 1 ? null : -1}
                      label="نام کاربری"
                      placeholder="نام کاربری خود را وارد کنید"
                      {...userDataForm.register("username")}
                    />
                    <Input
                      tabIndex={currentStep === 1 ? null : -1}
                      label="ایمیل"
                      placeholder="ایمیل خود را وارد کنید"
                      {...userDataForm.register("email")}
                    />
                    <Input
                      tabIndex={currentStep === 1 ? null : -1}
                      label="شماره تماس"
                      placeholder="09011234567"
                      {...userDataForm.register("phone")}
                    />
                    <Input
                      tabIndex={currentStep === 1 ? null : -1}
                      label="رمز عبور"
                      placeholder="رمز عبور خود را وارد کنید"
                      type="password"
                      {...userDataForm.register("password")}
                    />
                    <Input
                      tabIndex={currentStep === 1 ? null : -1}
                      label="تکرار رمز عبور"
                      placeholder="رمز عبور خود را تایید کنید"
                      type="password"
                      {...userDataForm.register("confirmPassword")}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {/* Input field */}
                  <div className="flex flex-col gap-8 py-8">
                    <div>
                      <p className="text-lg text-slate-800 mb-2">
                        لطفا عکس کارت دانشجویی خود را آپلود کنید.
                      </p>
                      <p className="text-slate-600">
                        (برای تایید احرازهویت دانشجوی گرامی)
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                      <div className="h-[180px] aspect-video">
                        <img
                          className="w-full h-full object-contain rounded-lg"
                          alt="student card image preview"
                          src={studentCardImgPreview ?? QuestionMarkImg}
                        />
                      </div>
                      {!studentCardImgPreview ? (
                        <p className="text-slate-500 text-center h-[24px]">
                          تصویری انخاب نشده!
                        </p>
                      ) : (
                        <p className="h-[24px]"></p>
                      )}
                      <Dropzone
                        noClick
                        ref={dropzoneRef}
                        onDrop={fileSelectHandler}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps()}
                            tabIndex={-1}
                            className="flex justify-center items-center"
                          >
                            <input
                              {...getInputProps()}
                              className="hidden"
                              tabIndex="-1"
                            />
                            <Button
                              onClick={openFileDialog}
                              tabIndex={currentStep === 2 ? null : -1}
                              label="انتخاب تصویر"
                              type="outline"
                            />
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Button
                className="w-full"
                label={currentStep !== 2 ? "ادامه" : "ثبت نام"}
                onClick={nextStepHandler}
              />
              <div className="flex items-center gap-2 flex-col w-full">
                <span>حساب کاربری دارید؟</span>
                <Button
                  label="ورود"
                  className="self-stretch"
                  onClick={navigateToLoginHandler}
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

export default Signup;
