export { auth as middleware } from "@/auth";

export const config = {
    // Matcher ignoring internal next files and static files
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
