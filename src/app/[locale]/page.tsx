'use client';

import Image from "next/image";

export default function Home() {

    const cards = [
        {
            id: 1,
            name: "Registry",
            icon: "/openg2p_logo_white.svg",
            url: "http://farmer-registry.openg2p.my",
            imgWidth: 40,
            imgHeight: 40,
        },
        {
            id: 2,
            name: "PBMS",
            icon: "/openg2p_logo_white.svg",
            url: "https://pbms.yourdomain.com",
            imgWidth: 40,
            imgHeight: 40,
        },
        {
            id: 3,
            name: "G2P Bridge",
            icon: "/openg2p_logo_white.svg",
            url: "https://g2pbridge.yourdomain.com",
            imgWidth: 40,
            imgHeight: 40,
        },
        {
            id: 4,
            name: "SPAR Mobile App",
            icon: "/openg2p_logo_white.svg",
            url: "https://spar.yourdomain.com",
            imgWidth: 40,
            imgHeight: 40,
        },
        {
            id: 5,
            name: "Rancher",
            icon: "/rancher.svg",
            url: "https://rancher.yourdomain.com",
            imgWidth: 40,
            imgHeight: 186,
        },
        {
            id: 6,
            name: "Superset",
            icon: "/superset.svg",
            url: "https://superset.yourdomain.com",
            imgWidth: 40,
            imgHeight: 142,
        },
        {
            id: 7,
            name: "Minio",
            icon: "/minio.svg",
            url: "https://minio.yourdomain.com",
            imgWidth: 40,
            imgHeight: 148,
        },
        {
            id: 8,
            name: "Master Data",
            icon: "/master-data.svg",
            url: "https://masterdata.yourdomain.com",
            imgWidth: 40,
            imgHeight: 40,
        },
        {
            id: 9,
            name: "Grievance Redressal",
            icon: "/grievance.svg",
            url: "https://grievance.yourdomain.com",
            imgWidth: 40,
            imgHeight: 40,
        },
    ];
    return (
        <div className="w-full min-h-[calc(100vh-52px)] flex flex-col">
            <div className="w-full h-31.5 bg-[#E9BC19] flex flex-col items-center justify-center text-center">
                <h1 className="font-['Roboto_Slab'] font-semibold text-[28px] leading-[100%]">
                    Welcome to OpenG2P Staff Portal
                </h1>

                <p className="mt-2 font-['Roboto'] font-normal text-[16px] leading-[100%]">
                    Lorem Ipsum is simply dummy text of the printing.
                </p>
            </div>

            <div className="w-full bg-black py-12 flex-1">
                <div className="px-30 grid grid-cols-4">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => window.open(card.url, "_blank")}
                            className="relative group overflow-hidden h-38.25 bg-black p-7.5 flex flex-col justify-between border-[#292929] border-r border-b cursor-pointer nth-[4n+1]:border-l nth-[-n+4]:border-t"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_0%_100%,rgba(233,188,25,0.40)_0%,rgba(233,188,25,0.25)_35%,rgba(233,188,25,0.12)_55%,transparent_75%)]" />

                            <div className="relative z-10">
                                <Image
                                    src={card.icon}
                                    alt={card.name}
                                    width={card.imgWidth}
                                    height={40}
                                    className="h-10 w-auto object-contain"
                                />
                            </div>

                            <div className="relative z-10 text-white text-[20px] font-medium">
                                {card.name}
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