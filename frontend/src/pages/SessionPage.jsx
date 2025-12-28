import React from "react";
import { useParams } from "react-router";
import Navbar from "../util/Navbar";
import ProblemDetail from "../util/ProblemDetail";
import CodeEditor from "../util/CodeEditor";
import { useQuery } from "@tanstack/react-query";
import { sessionAPI } from "../api/sessions";
import { useEffect } from "react";
export default function SessionPage() {
  const { id } = useParams();
  
  const { data: SessionByIDdata,isLoading,isError } = useQuery({
    queryKey: ["Sessions",id],
    queryFn: () => sessionAPI.getSessionById(id), // ✅ FUNCTION
    enabled: !!id,
  })
  console.log("session we get",SessionByIDdata);
  console.log("loading",isLoading);
  console.log("error",isError);

  return (
    <><div>hiiiii</div></>
  );
}
