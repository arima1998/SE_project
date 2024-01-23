import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar className="border-b-2 flex justify-between">
      <Link to="/" className="self-center whitespace-nowrap">
        <div className="contain flex flex-row">
          <img  className="w-20 h-auto" src="image/cuet_pic.png" alt="CUET LOGO"/>
          <div className="text-black translate-y-12 text-base lg:font-serif font-semibold">CUET CLASS REVIEW SYSTEM</div>
        </div>
      </Link>
      <div className="flex flex-row justify-between space-x-2 px-10">
        <div>Login</div>
        <div>SignUp</div>
      </div>
    </Navbar>
  )
}
