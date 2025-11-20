import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { User } from "lucide-react";

const Header = () =>  {
    return (
        <div className="max-h-[80px] fixed top-0 left-0 flex items-center justify-end py-2 px-1 gap-2 w-full bg-white">
            <Button className="bg-primary-800 ">Connect Wallet</Button>
            <div className="flex gap-3 items-center ">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-2 border-primary-200">
                    <Bell size={20}/>
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-2 border-primary-200">
                    <User size={20}/>
                </div>
            </div>
        </div>
    )
}

export default Header;