import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface contextProps {
  params: {
    id: string;
  };
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { id } = context.params;
    await db.post.delete({
      where: {
        id: id,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { id } = context.params;
    const body = await req.json();
    await db.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        content: body.content,
        tagId: body.tagId,
      },
    });
    return NextResponse.json({ message: "Post updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: Request, context: contextProps) {
  try {
    const { id } = context.params;
    const post = await db.post.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
