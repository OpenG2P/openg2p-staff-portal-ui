"use client";
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import { ProfileDropdown } from '@/components';

export default function Header() {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <header className="w-full bg-white flex items-center justify-between p-3 fixed top-0 left-0 right-0 z-20 h-17.5">
            <Link href={`/${locale}`} className="flex items-center gap-2">
                <Image
                    src={"/openg2p_logo.png"}
                    alt="Registry Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                    unoptimized
                />
                <div className="flex items-center gap-3">
                    <span className="text-[20px] text-black font-medium">
                        {"Staff Portal"}
                    </span>
                </div>
            </Link>

            <div className="items-center gap-8">
                <ProfileDropdown />
            </div>
        </header>
    );
}
