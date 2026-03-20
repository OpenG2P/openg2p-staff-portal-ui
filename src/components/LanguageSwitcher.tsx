'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import React, { useRef, useState, useTransition } from 'react';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

const flagMap: Record<string, string> = {
    en: '/en_flag.png',
    de: '/de_flag.png',
    cs: '/cs_flag.png',
};

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations();
    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, () => setOpen(false), open);

    const handleLanguageChange = (newLocale: string) => {
        setOpen(false);
        startTransition(() => {
            router.replace({ pathname }, { locale: newLocale });
        });
    };

    const currentFlag = flagMap[locale] || '/en_flag.png';

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                disabled={isPending}
                className="flex items-center justify-between rounded-[10px] gap-2 px-4 py-2 min-w-35 text-[16px] font-medium cursor-pointer transition-all focus:outline-none"
            >
                <div className="flex items-center gap-2">
                    <div className="w-6 h-4 relative rounded-sm overflow-hidden shrink-0 border">
                        <Image
                            src={currentFlag}
                            alt={locale}
                            fill
                            sizes="28px"
                            className="object-cover"
                        />
                    </div>

                    <span className="text-black text-[18px]">
                        {t(locale)}
                    </span>
                </div>

                <Image
                    src="/down_arrow.png"
                    alt="toggle"
                    width={14}
                    height={14}
                    className={`transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div
                    className="absolute top-0 left-0 min-w-35 ring-1 ring-black/10 rounded-[10px] bg-white overflow-hidden z-50"
                >
                    {routing.locales.map((loc, index) => (
                        <button
                            key={loc}
                            onClick={() => handleLanguageChange(loc)}
                            className="flex items-center justify-between gap-2 px-4 py-2 min-w-35 text-[16px] font-medium cursor-pointer transition-all focus:outline-none"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-4 relative rounded-sm overflow-hidden shrink-0 border">
                                    <Image
                                        src={flagMap[loc] || '/en_flag.png'}
                                        alt={loc}
                                        fill
                                        sizes="28px"
                                        className="object-cover"
                                    />
                                </div>
                                <span className='text-black text-[18px]'>{t(loc)}</span>
                            </div>
                            {index === 0 && (
                                <Image
                                    src="/down_arrow.png"
                                    alt="selected"
                                    width={14}
                                    height={14}
                                    className="rotate-180"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}