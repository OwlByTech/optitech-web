export const metadata = {
  title: 'Asesors',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex w-full max-w-full h-full flex-row gap-4 px-4 pb-4">
      <div className="flex shadow-md w-full max-w-full h-full rounded-lg flex-col bg-white gap-8 md:gap-0">
        {children}
      </div>
    </section>
  );
}
