"use client";

import Image from "next/image";
import FirstAidKit from "../../../../public/FirstAidKit.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cards } from "./cards";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import XP from "../../../../public/xp.svg";
import Star from "../../../../public/star.svg";
import Appointments from "../../../../public/appointments.svg";
import Friends from "../../../../public/friends.svg";
import { SignedIn, UserButton, UserProfile } from "@clerk/nextjs";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import Navbar from "../dashboard/navbar"
const Dashboard = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const links = [
    { href: "/", label: "My stats" },
    { href: "/quests", label: "Quests" },
    { href: "/learn", label: "Learn" },
  ];

  return (
    <>
    <Navbar/>
      <section id="dashboard">
        <div className="md:mt-20 mt-8 md:ml-[8.5rem] ml-[1rem] ">
          <span className="md:text-[20px] text-[18px] font-medium">
            {/* user.name */}
            Welcome, Maryam
          </span>
          <UserButton />
          <div className="mt-1 flex md:flex-row flex-col gap-1">
            <span className="text-[#5C4A6D] font-bold">
              Your last screening date:
            </span>
            <span className="text-[#767478]">24th April, 2024</span>
          </div>
        </div>
      </section>

      <section>
        <div className="h-fit flex flex-wrap justify-items-center gap-6 mt-10 md:ml-[9.5rem] ml-5">
          <Card role="button" className="w-[220px] h-[220px] flex items-center">
            <CardContent className="ml-12">
              <Image src={XP} alt="xp" className="w-10 h-10 ml-2" />
              <CardDescription className="flex justify-center text-center"></CardDescription>
              <div className="mt-1">
                <span className="text-center text-[20px] text-[#000000] font-bold space-y-3">
                  250XP
                </span>
              </div>

              <div className="mt-1 ml-1">
                <span className="text-[15px] text-[#767478] font-normal space-y-2 mt-50">
                  Total XP
                </span>
              </div>
            </CardContent>
          </Card>

          <Card role="button" className="w-[220px] h-[220px] flex items-center">
            <CardContent className="ml-12">
              <Image src={Star} alt="star icon" className="w-10 h-10 ml-3" />
              <CardDescription className="flex justify-center text-center"></CardDescription>
              <div className="mt-1 ml-5">
                <span className="text-center text-[20px] text-[#000000] font-bold space-y-3">
                  15
                </span>
              </div>

              <div className="mt-1">
                <span className="text-[15px] text-[#767478] font-normal space-y-2 mt-50 -ml-8">
                  Completed quests
                </span>
              </div>
            </CardContent>
          </Card>

          <Card role="button" className="w-[220px] h-[220px] flex items-center">
            <CardContent className="ml-12">
              <Image
                src={Appointments}
                alt="star icon"
                className="w-10 h-10 ml-4"
              />
              <CardDescription className="flex justify-center text-center"></CardDescription>
              <div className="mt-1 ml-7">
                <span className="text-center text-[20px] text-[#000000] font-bold space-y-3">
                  3
                </span>
              </div>

              <div className="mt-1 -ml-8">
                <span className="text-[15px] text-[#767478] font-normal space-y-2 mt-50 ">
                  Appointments made
                </span>
              </div>
            </CardContent>
          </Card>

          <Card role="button" className="w-[220px] h-[220px] flex items-center">
            <CardContent className="ml-12">
              <Image src={Friends} alt="star icon" className="w-10 h-10 ml-2" />
              <CardDescription className="flex justify-center text-center"></CardDescription>
              <div className="mt-1 ml-6">
                <span className="text-center text-[20px] text-[#000000] font-bold space-y-3">
                  5
                </span>
              </div>

              <div className="mt-1 -ml-4">
                <span className="text-[15px] text-[#767478] font-normal space-y-2 mt-50">
                  Friends made
                </span>
              </div>
            </CardContent>
          </Card>
          <Link>
          <Card role="button" className="w-[220px] h-[220px] flex items-center">
            <CardContent className="ml-12">
              <Image src={Friends} alt="star icon" className="w-10 h-10 ml-2" />
              <CardDescription className="flex justify-center text-center"></CardDescription>
              <div className="mt-1 ml-6">
                <span className="text-center text-[20px] text-[#000000] font-bold space-y-3">
                  5
                </span>
              </div>

              <div className="mt-1 -ml-4">
                <span className="text-[15px] text-[#767478] font-normal space-y-2 mt-50">
                  ChatBuddy
                </span>
              </div>
            </CardContent>
          </Card>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
