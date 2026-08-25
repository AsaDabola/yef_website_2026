/* The site and Payload's admin each render their own <html> and <body>, so the
   root layout only passes children through — see src/app/(frontend)/layout.tsx
   and src/app/(payload)/layout.tsx. */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
