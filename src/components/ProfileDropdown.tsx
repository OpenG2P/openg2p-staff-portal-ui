"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useAuth } from "@/context/Authcontext";

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const t = useTranslations();
    const { logout } = useAuth();

    const toggleDropdown = () => setOpen((prev) => !prev);

    const logoutHandler = () => {
        logout();
    };

    useClickOutside(dropdownRef, () => setOpen(false), open);

    const avatarSrc = "/user_image.png";

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-3 px-1 py-1 bg-white text-sm font-medium text-gray-800 rounded-md transition cursor-pointer"
            >
                <span className="text-[16px] text-black font-normal">
                    <span className="font-medium">{'user'}</span>
                </span>

                <div
                    className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: "url('/user_bg.png')" }}
                >
                    <Image
                        src={avatarSrc}
                        alt="User Avatar"
                        width={20}
                        height={20}
                        className="object-cover rounded-full"
                    />
                </div>
            </button>

            {open && (
                <div className="absolute right-0 top-10 mt-3 w-35 bg-[#E0E0E0] border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col">
                    <div className="absolute -top-2.5 right-9 w-5 h-5 bg-[#E0E0E0] border-l border-t border-gray-200 rotate-45"></div>

                    <div className="flex flex-col">
                        <Link
                            href={`/myprofile`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-x-2 px-4 py-4 text-sm text-black font-bold"
                        >
                            <Image
                                src="/user_dropdown.png"
                                alt={'my_profile'}
                                width={13}
                                height={15}
                            />
                            {'my_profile'}
                        </Link>

                        <button
                            onClick={logoutHandler} // ✅ use logout from context
                            className="flex items-center gap-x-2 px-4 pb-4 text-sm text-black font-bold"
                        >
                            <Image
                                src="/logout.png"
                                alt={'logout'}
                                width={18}
                                height={18}
                            />
                            {'logout'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}