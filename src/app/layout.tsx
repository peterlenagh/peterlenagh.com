import "./globals.scss";
import HTMLTag from "@/app/HtmlTag";

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
      <body>{children}</body>
    </HTMLTag>
  );
}
