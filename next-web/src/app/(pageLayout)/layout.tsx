"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { getLocalParam } from "../commons/cookies";
import Header from "../components/Header";
import { SidebarProvider } from "../components/Sidebar/useSidebar";
import { LOGIN_ROUTE } from "../constants/strings";
import { AuthContext } from "../providers/AuthProvider";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { signedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!!getLocalParam("token") == false) {
      console.log("please sign in");
      router.push(LOGIN_ROUTE);
    } 
  }, [signedIn]);
  return (
    <div className="page-layout flex flex-row h-screen">
      {signedIn && (
        <SidebarProvider>
          <div className="w-full">
            <Header />
            {children}
          </div>
        </SidebarProvider>
      )}
    </div>
  );
}
