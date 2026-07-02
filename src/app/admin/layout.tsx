import AdminSidebar from "@/components/AdminSidebar";

export const metadata = {
  title: "Admin - Marine World of Texas",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#0B1325",
          color: "#fff",
          overflowX: "hidden",
        }}
      >
        {children}
      </main>
    </div>
  );
}
