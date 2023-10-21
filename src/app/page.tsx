import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";
import { Post } from "@prisma/client";

const getPosts = async () => {
  const response = await db.post.findMany();
  return response;
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {posts?.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
