"use client";
import FormPost from "@/components/FormPost";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { FormInputPost } from "@/types";
import BackButton from "@/components/BackButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const router = useRouter();
  const handleCreatePost: SubmitHandler<FormInputPost> = (data: FormInputPost) => {
    createPost(data);
  };

  const { mutate: createPost } = useMutation({
    mutationFn: async (data: FormInputPost) => {
      return axios.post("/api/posts/create", data);
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
      <BackButton />
      <h1 className="text-xl my-4 font-bold text-center">Create Post</h1>
      <FormPost submit={handleCreatePost} isEditing={false} />
    </div>
  );
};

export default CreatePage;
