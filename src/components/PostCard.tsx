import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl border">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.content}</p>
        <div className="card-actions justify-end">
          <Link href={`/blog/${post.id}`} as={`/blog/${post.id}`} className="hover:underline">
            {" "}
            Read More...{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
