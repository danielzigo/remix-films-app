// This file is the same name as the folder, so
// this file is the layout route of the folder
import { Outlet } from "@remix-run/react";

export default function Parent() {
  return (
    <div className="p-10">
      <Outlet />
    </div>
  )
}