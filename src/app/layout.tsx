import "./globals.scss";
import HTMLTag from "@/app/HtmlTag";
import { Analytics } from "@vercel/analytics/react";

const description = `This is my personal website,
I mostly use to host presentations or demo work, so I'm afraid there's not loads here to see...`;
export const metadata = {
  title: "Peter Lenagh",
  description,
  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HTMLTag id="layout" lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {children}
        <Analytics />
      </body>
    </HTMLTag>
  );
}
