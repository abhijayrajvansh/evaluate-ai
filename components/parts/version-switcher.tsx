"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { useRouter } from "next/navigation";

export function VersionSwitcher() {
  const router = useRouter();

  const handleReturnToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div
      onClick={handleReturnToDashboard}
      className="mb-2 flex gap-2 leading-none p-3 rounded-md hover:bg-white hover:shadow-sm transition cursor-pointer"
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <div>
        <p className="font-semibold">eValuate</p>
        <p className="text-xs">Dashboard</p>{" "}
      </div>
    </div>
  );
}
