import "./globals.css";

export const metadata = {
  title: "Best Friend Buddy",
  description: "Premium Friendship Apology & Bonding App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
