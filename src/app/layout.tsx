import "./globals.css";
import Providers from "./providers/QueryProvider";

export const metadata = {
  title: "Task1 Project",
  description: "Weekend Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}