"use client";
import React, { useEffect, useState } from "react";
import useAdminDash from "./useAdminDash";
import ButtonComponent from "@/components/shared/button/button.component";

const AdminDashComponent = () => {
  const { data, fetchNextPage, fetchPreviousPage } = useAdminDash();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data && data.pageParams) {
      setCurrentPage(data.pageParams[data.pageParams.length - 1]);
    }
  }, [data]);

  return (
    <div>
      {data &&
        data.pages[currentPage - 1].payload.collection.map((item) => (
          <p key={item._id}>{item.username}</p>
        ))}
      <ButtonComponent content="next" onClick={fetchNextPage} />
      <ButtonComponent content="prev" onClick={fetchPreviousPage} />
    </div>
  );
};

export default AdminDashComponent;
