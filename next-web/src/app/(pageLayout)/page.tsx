"use client";

import { Alert, Button } from "@material-tailwind/react";
import { Loading } from "../components/Loading";
import { Sidebar } from "../components/Sidebar/Sidebar";
import PlayGround from "../components/Toast/PlayGround";
import PasswordInput from "../components/molecules/PasswordInput";
import styles from "./page.module.css";
import NoticeAlert from "../components/molecules/NoticeAlert";
import { SortableTable } from "../components/molecules/SortTable";
import axios from "axios";
import { initialize } from "../@openapi";
import { rapini } from "../providers/QueryProvider";

export default function Index() {

  const { queries, mutations, requests } = rapini;
  const { mutate, data } = mutations.useAuthControllerLogin();
  const login = () => {
    console.log(process.env.NEXT_PUBLIC_API_DOMAIN)
    console.log("login");
    const res = mutate({
      email: "admin@example.com",
      password: "Ss123123",
    });
    console.log(data);
  };
  return (
    <div
      className={`bg-white flex flex-column justify-center max-h-pageContent min-h-pageContent`}
    >
      <Loading enabled={false} />
      {/* <div className="py-2 w-10/12 h-fit">
        <NoticeAlert description="プロジェクトを選択することでプロジェクトにメンバーをアサインできます" />
      </div> */}
      <PlayGround />
      {/* <PasswordInput /> */}
      {/* <SortableTable /> */}
      {/* <Button onClick={login}>LOGIN</Button>; */}
    </div>
  );
}
