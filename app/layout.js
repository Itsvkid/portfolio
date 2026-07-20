import "./globals.css";

export const metadata = {
  title: "Vinaykumar Venkateshkumar — Propulsion / CFD Engineer",
  description:
    "Portfolio of Vinaykumar Venkateshkumar — propulsion and CFD engineering graduate specialising in ANSYS Fluent simulation, jet flow control, and parametric CAD for nacelle installation aerodynamics.",
  openGraph: {
    title: "Vinaykumar Venkateshkumar — Propulsion / CFD Engineer",
    description:
      "Propulsion and CFD engineering portfolio — jet mixing CFD, nacelle installation aerodynamics, parametric CAD.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
