import BackButton from "@/components/BackButton";
import ButtonActions from "@/components/ButtonActions";
import { db } from "@/lib/db";
import React from "react";

interface BlogDetailsPageProps {
  params: {
    id: string;
  };
}

const BlogDetailsPage: React.FC<BlogDetailsPageProps> = async ({ params }) => {
  const post = await db.post.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div>
      <BackButton />
      <div className="mb-8">
        <h1 className="text-2xl font-bold my-4">{post?.title}</h1>
        {post && <ButtonActions id={post?.id} />}
      </div>
      <p className="text-slate-700">{post?.content}</p>
    </div>
  );
};

export default BlogDetailsPage;
