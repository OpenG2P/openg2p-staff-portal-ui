'use client';

import Image from "next/image";
import { useEffect, useState } from "react";


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
    return (
        <div className="w-full min-h-[calc(100vh-52px)] flex flex-col">
            <div className="w-full h-31.5 bg-[#E9BC19] flex flex-col items-center justify-center text-center">
                <h1 className="font-['Roboto_Slab'] font-semibold text-[28px] leading-[100%]">
                    Welcome to OpenG2P Staff Portal
                </h1>

                <p className="mt-2 font-['Roboto'] font-normal text-[16px] leading-[100%]">
                    OpenG2P enables governments and humanitarian organisations to deliver critical social benefits directly to those who need them.
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
                            className={`relative overflow-hidden h-38.25 bg-black p-7.5 flex flex-col justify-between border-[#292929] border-r border-b nth-[4n+1]:border-l nth-[-n+4]:border-t ${card.disabled ? "cursor-not-allowed" : "cursor-pointer group"}`}
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

                            <div className={`relative z-10 text-white text-[20px] font-medium ${card.disabled ? "opacity-50" : ""}`}>
                                {card.application_description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full bg-[#191919]">
                <div className="px-30 py-6 flex items-center justify-between text-white text-[14px] font-normal">
                    <div>
                        © 2026 OpenG2P.org. All Rights Reserved.
                    </div>
                    <div className="flex items-center gap-30">
                        <span className="cursor-pointer hover:text-[#E9BC19]">English</span>
                        <span className="cursor-pointer hover:text-[#E9BC19]">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-[#E9BC19]">Contact Us</span>
                    </div>
                </div>
            </div>
        </div>
    );
}