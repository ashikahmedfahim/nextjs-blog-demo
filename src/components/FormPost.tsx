"use client";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputPost } from "../types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tag } from "@prisma/client";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
  initialvalue?: FormInputPost;
}

const FormPost: FC<FormPostProps> = ({ submit, isEditing, initialvalue }) => {
  const { register, handleSubmit } = useForm<FormInputPost>({
    defaultValues: initialvalue,
  });

  const {
    isLoading: isLoadingTags,
    isError: isErrorTags,
    data: dataTags,
    error: errorTags,
  } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axios.get("/api/tags");
      return res.data;
    },
  });

  return (
    <form className="flex flex-col items-center justify-center gap-5 mt-10" onSubmit={handleSubmit(submit)}>
      <input type="text" {...register("title", { required: true })} placeholder="Post tittle" className="input input-bordered w-full max-w-lg" />
      <textarea
        {...register("content", { required: true })}
        className="textarea textarea-bordered w-full max-w-lg"
        placeholder="Post content"
      ></textarea>
      <select {...register("tagId", { required: true })} className="select select-bordered w-full max-w-lg" defaultValue={""}>
        <option value="">Select tag</option>
        {isLoadingTags ? (
          <option>Loading...</option>
        ) : isErrorTags ? (
          <option>Error</option>
        ) : (
          dataTags?.map((tag: Tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))
        )}
      </select>
      <button type="submit" className="btn btn-primary w-full max-w-lg">
        {isEditing ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default FormPost;
