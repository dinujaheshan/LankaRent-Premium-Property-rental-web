export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin pages use the root layout's html/body/globals.css
  // The Navbar component itself returns null for admin routes
  return <>{children}</>;
}
