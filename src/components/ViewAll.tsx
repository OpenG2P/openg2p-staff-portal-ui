"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ViewAllProps {
    href: string;
    label?: string;
    bgColor?: string;
    hoverBgColor?: string;
    hoverTextColor?: string;
    textColor?: string;
}

export default function ViewAll({
    href,
    label = "View All",
    bgColor = "#F5F5F5",
    hoverBgColor,
    hoverTextColor,
    textColor = "#000000"
}: ViewAllProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex justify-start mt-5">
            <Link
                href={href}
                className="text-[14px] flex items-center font-medium px-3 py-1 rounded-[10px] transition-colors duration-200"
                style={{
                    backgroundColor: isHovered && hoverBgColor ? hoverBgColor : bgColor,
                    color: isHovered && hoverTextColor ? hoverTextColor : textColor
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {label}
                <Image
                    src="/images/common/right_arrow.png"
                    alt="arrow"
                    width={12}
                    height={12}
                    className="ml-1.5"
                />
            </Link>
        </div>
    );
}