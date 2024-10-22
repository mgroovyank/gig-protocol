//@ts-nocheck
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getPayload, isLoggedIn } from "./app/actions/login";
import { CLIENT, FREELANCER } from "./constants/appConstants";
import { decodeJWT } from "thirdweb/utils";

/**
 * This function can be marked `async` if using `await` inside
 * @param request executed on the edge, runs before page rendering and API routes.
 * @author mgroovyank (MAYANK CHHIPA)
 */
export async function middleware(request: NextRequest) {
  console.log("---------------Inside Middleware!!----------------");

  const pathname = request.nextUrl.pathname;
  const isSignInPage = pathname == "/sign-in" ? true : false;

  // Get user id and role from jwt
  const jwtObject = request.cookies.get("jwt");
  if (jwtObject == undefined) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const jwt: string = decodeJWT(request.cookies.get("jwt")?.value);
  const payload: JWTPayload = jwt.payload.ctx;
  const userId = payload.userId;
  const role = payload.role;

  if (isSignInPage) {
    if (role == FREELANCER) {
      return NextResponse.redirect(
        new URL("/freelancer-dashboard", request.url)
      );
    }
    if (role == CLIENT) {
      return NextResponse.redirect(new URL("/client-dashboard", request.url));
    }
  }

  return NextResponse.next();
  // const isFreelancerDashboard = pathname.startsWith("/freelancer-dashboard");
  // const isChatWindow = pathname.startsWith("/chat");
  // const isAuth = await isLoggedIn();

  // if (!isAuth) {
  //   console.log("Not Authenticated!!!!!");
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // const payload: JWTPayload = await getPayload();
  // const payloadContext: any = payload.ctx;
  // if (payload.ctx!.role == FREELANCER) {
  //   console.log("Role is freelancer confirmed!!");
  // }
  // if (isFreelancerDashboard) {
  //   console.log("Inside freelancer dashboard!!!!!");
  //   const userDetails = await getPayload();
  //   console.log(userDetails);
  //   if (!userDetails.ctx.role) {
  //     console.log("User has not been assigned any role!!");
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
  // if (isChatWindow) {
  //   console.log("Inside chat window");
  //   console.log(request.nextUrl);
  //   const cloneUrl = request.nextUrl.clone();
  //   cloneUrl.searchParams.set("userId", payload.ctx.userId);
  //   request.nextUrl.searchParams.set("userId", payload.ctx.userId);
  //   const searchParams = request.nextUrl;
  //   console.log("use search params ", payload.ctx.userId);
  //   if (payload.ctx.role != FREELANCER && payload.ctx.role != CLIENT) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  //   const id = request.nextUrl.pathname.split("/")[2];
  //   console.log("------------------", id);
  //   if (payload.ctx.role == FREELANCER) {
  //     if (payload.ctx.userId == id.split("-")[1]) {
  //       console.log("Trying to access valid chat!");
  //     }
  //   } else if (payload.ctx.role == CLIENT) {
  //     console.log("Accessing chat as client!");
  //     if (payload.ctx.userId == id.split("-")[0]) {
  //       console.log("Trying to access valid chat!");
  //     }
  //   }
  //   console.log("return rewritten response");
  //   console.log(request.nextUrl.searchParams);
  //   console.log(cloneUrl);
  //   // return NextResponse.rewrite(
  //   //   new URL("http://localhost:3000/chat/2-1-1?userId=2")
  //   // );
  //   console.log(request.nextUrl.searchParams.get("userId"));
  //   return NextResponse.rewrite(cloneUrl);
  // }
  // // Continue processing if no condition is met
  // return NextResponse.next();
  //   return NextResponse.redirect(new URL("/freelancer-dashboard", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-in"],
  // matcher: ["/freelancer-dashboard/:path*", "/chat/:path*"],
};
