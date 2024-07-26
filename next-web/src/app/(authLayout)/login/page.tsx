"use client";

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import Button from "@material-tailwind/react/components/Button";
import Typography from "@material-tailwind/react/components/Typography";

import { getCookie, removeCookie, setCookie } from "../../commons/cookies";
import { COOKIE_CID, COOKIE_NAME } from "../../constants/cookies";
import { Loading } from "@/app/components/Loading";
import TextInput from "@/app/components/molecules/TextInput";
import PasswordInput from "@/app/components/molecules/PasswordInput";
import Link from "next/link";
import { useToast } from "@/app/components/Toast/useToast";
import { ToastError, ToastSuccess } from "@/app/components/Toast/type";
import { rapini } from "@/app/providers/QueryProvider";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signedInUser, setSignedUser] = useState(getCookie(COOKIE_NAME));
  const { add } = useToast();
  const { queries, mutations, requests } = rapini;
  const { mutate, data } = mutations.useAuthControllerLogin();

  useEffect(() => {
    const cookieId = getCookie(COOKIE_CID);
    if (!cookieId) {
      setSignedIn(false);
    } else {
      setSignedIn(true);
      setSignedUser(getCookie(COOKIE_NAME));
    }
  }, []);

  useEffect(() => {
    if (data.success) {
      setCookie(COOKIE_CID, resp.data.id);
      setCookie(COOKIE_NAME, email);

      setSignedUser(email);
      setSignedIn(true);

      add(new ToastSuccess("success login"));
    } else {
      add(new ToastError("login failed !!!"));
    }
    setLoading(false);
    setLoading(false);
  }, [add, data]);

  const login = async () => {
    setLoading(true);
    console.log("login");
    const { email, password } = values;
    mutate({ email, password });
  };

  const logout = () => {
    setSignedIn(false);
    removeCookie(COOKIE_CID);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    // Basic Information
    email: Yup.string()
      .email("メールアドレスは無効です")
      .required("メールアドレスは必須です"),
    password: Yup.string().required("パスワードは必須です"),
  });

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: login,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
  });

  //   const gotoFrontApp = () => {
  //     gotoApp(`${feUrl}?id=${getCookie(COOKIE_CID)}`);
  //   };

  return (
    <div className="login-page relative">
      <Loading enabled={loading} />
      {/* <Header /> */}
      {/* Body */}
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 select-none">
            <Typography className="text-center font-bold text-2xl mb-4">
              {"LOGIN"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mt-1 relative rounded-md shadow-none">
                  <TextInput
                    placeholder="メールアドレス"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                  />
                  {Boolean(errors.email) && (
                    <Typography variant="small" color="red" className="pl-2">
                      {errors.email}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="パスワード"
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                />

                {Boolean(errors.password) && (
                  <Typography variant="small" color="red" className="pl-2">
                    {errors.password}
                  </Typography>
                )}
              </div>

              <div className="mt-6 flex items-center justify-end">
                <div className="text-sm leading-5">
                  <Link href="/reset-password">RESET_PASSWORD_STR</Link>
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <Button className="w-full" type="submit">
                    {"LOGIN"}
                  </Button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
