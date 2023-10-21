"use client";
import FormPost from "@/components/FormPost";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { FormInputPost } from "@/types";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface EditPageProps {
  params: {
    id: string;
  };
}

const EditPage: React.FC<EditPageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const handleEditPost: SubmitHandler<FormInputPost> = (data: FormInputPost) => {
    updatePost(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const res = await axios.get(`/api/posts/${id}`);
      return res.data;
    },
  });

  const { mutate: updatePost } = useMutation({
    mutationFn: async (data: FormInputPost) => {
      return axios.patch(`/api/posts/${id}`, data);
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
      <h1 className="text-xl my-4 font-bold text-center">Edit Post</h1>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <FormPost submit={handleEditPost} initialvalue={data} isEditing />
          </div>
        )
      }
    </div>
  );
};

export default EditPage;
