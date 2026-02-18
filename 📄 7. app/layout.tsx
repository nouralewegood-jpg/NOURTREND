export const metadata = {
  title: 'Nourtrend - AI Store',
  description: 'متجر إلكتروني إماراتي مدعوم بالذكاء الاصطناعي',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
