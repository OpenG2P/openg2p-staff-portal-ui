import type { Metadata } from "next";
import "@/commons/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Header } from "@/components";
import { Roboto } from 'next/font/google'
import { AuthProvider } from "@/context/Authcontext";


const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return {
        title: "Openg2p",
        description: "",
        icons: {
            icon: "/openg2p_logo_white.svg",
        },
    };
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();


    return (
        <html lang={locale}>
            <body className={`${roboto.className} antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <AuthProvider>
                        <Header />
                        <div className="pt-17.5">
                            {children}
                        </div>
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

