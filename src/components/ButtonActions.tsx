'use client';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ButtonActionsProps {
  id: string;
}

const ButtonActions: React.FC<ButtonActionsProps> = ({ id }) => {
  const router = useRouter();
  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });
  return (
    <div>
      <Link href={`/edit/${id}`} className="btn mr-2">
        <Pencil /> Edit
      </Link>
      <button className="btn btn-error" onClick={() => deletePost()}>
        <Trash />
        Delete
      </button>
    </div>
  );
};

export default ButtonActions;
