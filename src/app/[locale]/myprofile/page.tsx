"use client";

import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';


export default function MyProfile() {
    const profile = {
        name: 'John Doe',
        position: 'Registry Officer',
        phone: '+91 98765 43210',
        email: 'john.doe@registry.com',
        location: 'Bangalore, India',
        registryId: 'REG-2024-0098',
        gender: 'Male',
        dob: '12 Aug 1994',
        language: 'English',
        timezone: 'Asia/Calcutta (01/27/2026 12:59:35)',
        notifications: 'enabled',
        image: '/profile.png',
    };
    return (
        <div className="min-h-screen bg-[#F3F1E4]">
            <div className="flex mx-7.5 bg-white rounded-[10px]">
                <div
                    className="w-[20%] bg-[#F2BA1A] bg-[url('/bg_pattern.png')] rounded-[10px] shadow-[0px_17px_21px_0px_#F2BA1A2B] flex items-start justify-center"
                >
                    <Image
                        src={profile.image}
                        alt="Profile"
                        width={200}
                        height={200}
                        className="rounded-full object-cover mt-10"
                    />
                </div>

                <div className="w-[80%] flex-1 rounded-[30px] pt-10">
                    <div className="px-12.5 py-4">
                        <h1 className="text-[30px] font-semibold text-[#ED7C22]">{profile.name}</h1>
                        <p className="text-[18px] font-semibold text-black">{profile.position}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 px-12.5 py-4 bg-[#D9D9D940]">
                        <Info label="Phone" value={profile.phone} verified />
                        <Info label="Email" value={profile.email} verified />
                    </div>

                    <div className="grid grid-cols-2 gap-6 px-12.5 py-4">
                        <Info label="Location" value={profile.location} />
                        <Info label="Registry ID" value={profile.registryId} />
                    </div>

                    <div className="grid grid-cols-2 gap-6 px-12.5 py-4 bg-[#D9D9D940]">
                        <Info label="Gender" value={profile.gender} />
                        <Info label="Date of Birth" value={profile.dob} />
                    </div>

                    <div className="grid grid-cols-2 gap-6 px-12.5 py-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Language</p>
                            <div className='-ml-4'>
                                <LanguageSwitcher />
                            </div>
                        </div>

                        <div>
                            <p className="text-[14px] text-black/50 mb-1">Timezone</p>
                            <div className="flex items-center justify-between">
                                <p className="text-[18px] font-medium">{profile.timezone}</p>
                                <Image
                                    src="/edit.png"
                                    alt="Edit timezone"
                                    width={16}
                                    height={16}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="px-12.5 py-4 bg-[#D9D9D940]">
                        <p className="text-sm text-gray-500 mb-2">Notifications</p>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="notifications"
                                    defaultChecked={profile.notifications === 'enabled'}
                                />
                                Enabled
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="notifications"
                                    defaultChecked={profile.notifications === 'disabled'}
                                />
                                Disabled
                            </label>
                        </div>
                    </div>
                    <div className="mt-auto pt-10 px-12.5 py-4 text-start">
                        <p className="text-[14px] text-black/50">Powered by</p>
                        <p className="text-[18px] text-black/50">OpenG2P Registry</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Info({
    label,
    value,
    verified = false,
}: {
    label: string;
    value: string;
    verified?: boolean;
}) {
    return (
        <div>
            <p className="text-[14px] text-black/50 mb-1">{label}</p>
            <div className="flex items-center gap-2">
                <p className="font-medium text-[18px]">{value}</p>

                {verified && (
                    <span className="px-3 pb-0.5 pt-1.5 text-[14px] font-semibold rounded-[10px] bg-[#2CC15726] text-[#00B765]">
                        Verified
                    </span>
                )}
            </div>
        </div>
    );
}