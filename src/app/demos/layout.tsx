import MainLayout from "@/components/MainLayout";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <MainLayout markdownBody={false}>{children}</MainLayout>
);

export default Layout;
