import { verifyJWT } from "@/lib/jwt";
import prisma from "@/lib/prisma";

// To get all posts from Database
export async function GET(req: Request) {
  const accessToken = req.headers.get("authorization");
  if (accessToken && verifyJWT(accessToken)) {
    const datas = await prisma.post.findMany({
      include: {
        author: true, // รวมข้อมูลผู้เขียน
      },
    });
    return new Response(JSON.stringify(datas));
  } else {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
        message: "You are not authorized to access this route",
      }),
      { status: 401 }
    );
  }
}