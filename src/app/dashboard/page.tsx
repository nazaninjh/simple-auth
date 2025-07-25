"use client";

import { AuthProvider } from "@/providers/auth.provider";

import { DashboardComponent } from "@/components/dashboard/dashboard.component";
import WrapperComponent from "@/components/wrapper/wrapper.component";
const page = () => {
  return (
    <AuthProvider>
      <WrapperComponent>
        <DashboardComponent />
      </WrapperComponent>
    </AuthProvider>
  );
};

export default page;
