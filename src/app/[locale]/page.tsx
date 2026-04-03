'use client';

import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

interface AppCard {
    id: number;
    application_description: string;
    icon_base64: string;
    width: number;
    disabled: boolean;
    application_url: string;
}

export default function Home() {
    const [cards, setCards] = useState<AppCard[]>([]);

    useEffect(() => {
        fetch("/api/applications")
            .then(res => res.json())
            .then(data => setCards(data));
    }, []);

    const t = useTranslations();
    return (
        <div className="w-full min-h-[calc(100vh-52px)] flex flex-col">
            <div className="w-full h-31.5 bg-[#E9BC19] flex flex-col items-center justify-center text-center">
                <h1 className="font-roboto-slab font-semibold text-[28px] leading-[100%]">
                    {t('welcomeTitle')}
                </h1>

                <p className="mt-2 font-normal font-roboto text-[16px] text-black/70">
                    {t('welcomeDescription')}
                </p>
            </div>

            <div className="w-full bg-black py-12 flex-1">
                <div className="px-30 grid grid-cols-4">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => {
                                if (!card.disabled) {
                                    window.open(card.application_url, "_blank");
                                }
                            }}
                            className={`relative overflow-hidden h-38.25 bg-black p-7.5 flex flex-col justify-between border-[#292929] border-r border-b nth-[4n+1]:border-l nth-[-n+4]:border-t ${card.disabled ? "" : "cursor-pointer group"}`}
                        >
                            {!card.disabled && (
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_0%_100%,rgba(233,188,25,0.40)_0%,rgba(233,188,25,0.25)_35%,rgba(233,188,25,0.12)_55%,transparent_75%)]" />
                            )}

                            <div className={`relative z-10 ${card.disabled ? "opacity-50" : ""}`}>
                                {card.icon_base64 ? (
                                    <img
                                        src={`data:image/svg+xml;base64,${card.icon_base64}`}
                                        className="h-10"
                                        alt={card.application_description}
                                    />
                                ) : (
                                    <div className="h-10 w-10 bg-gray-500" />
                                )}
                            </div>

                            <div className={`relative z-10 text-white text-[20px] font-roboto font-medium ${card.disabled ? "opacity-50" : ""}`}>
                                {card.application_description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full bg-[#191919]">
                <div className="px-30 py-6 flex items-center justify-between text-white text-[14px] font-normal font-roboto">
                    <div>
                        {t('footerCopyright')}
                    </div>
                    <div className="flex items-center gap-8">
                        <span
                            className="cursor-pointer hover:text-[#E9BC19]"
                            onClick={() => window.open("https://www.openg2p.org/privacy-policy", "_blank")}
                        >
                            {t('privacyPolicy')}
                        </span>
                        <div className="w-px h-4 bg-white opacity-70" />
                        <span
                            className="cursor-pointer hover:text-[#E9BC19]"
                            onClick={() => window.open("https://www.openg2p.org", "_blank")}
                        >
                            {t('contactUs')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}