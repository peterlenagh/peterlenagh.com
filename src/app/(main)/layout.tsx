import MainLayout from "@/components/MainLayout";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <MainLayout markdownBody={true}>{children}</MainLayout>
);

export default Layout;
