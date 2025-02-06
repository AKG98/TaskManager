import { FaPhone } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

export default function Footer() {
  return (
    <div className="lg:px-10 px-2 w-screen " id="contact">
      <div className="bg-stone-900 lg:p-20 p-10 text-white rounded-t-2xl">
        <div className="text-center border-b-2 border-stone-500 pb-10">
            <h1 className="lg:text-6xl md:text-5xl text-4xl">We&apos;re happy to assist you.</h1>
        </div>
        <h2 className="my-10 text-center">For any query reach us at</h2>
        <div className="flex justify-center items-center text-white gap-5 flex-col lg:flex-row text-lg">
            <a href="" className=" flex items-center gap-2">
                <FaPhone className="inline-block" />
                1800 XXXX XXXX
            </a>
            <a href="" className=" flex items-center gap-2">
                <MdAlternateEmail className="inline-block" />
                help@tmaster.com
            </a>
        </div>
      </div>
    </div>
  )
}
