
import logo from "../../../../public/logo.svg"
import { TiThMenu } from "react-icons/ti";
import Link from 'next/link';
import Image from "next/image";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-around p-4">
          <div className="flex items-center">
            <Link href='/'>
                <Image src={logo} className="" alt="logo" />
            </Link>
          </div>
            <div className="hidden md:flex md:items-center lg:flex justify-around gap-6">
                    <a className="text-black-[600] hover:text-black-[900] cursor-pointer ">Quest</a>
                    <a className="text-black-[600] hover:text-black-[900] cursor-pointer ">MyStats</a>
                    <a className="text-black-[600] hover:text-black-[900] cursor-pointer ">Learn</a>
            </div>
            <div>
                <IoMdNotificationsOutline className="w-10 h-10 md: hidden" />

            </div>
            <div className="md:hidden">
                 <button className="mobile-menu-button p-2">
                 <TiThMenu />
                    </button>
            </div> 
          </nav>

    </div>
  );
};

export default Navbar;
