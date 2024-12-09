"use client";

import React from "react";
import DashboardNavigationContainer from "../parts/DashboardNavigationContainer";
import SampleDashboard from "@/components/pages/SampleDashboard";

const Dashboard = () => {
  return (
    <DashboardNavigationContainer>
      <SampleDashboard />
    </DashboardNavigationContainer>
  )
};

export default Dashboard;
