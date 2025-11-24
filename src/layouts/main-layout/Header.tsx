import { Button } from "../../components/ui/button";
import { Bell } from "lucide-react";
import { User } from "lucide-react";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { Link } from "react-router";

const Header = () =>  {
    return (
        <div className="max-h-22 w-full bg-white fixed top-0 z-20 left-0 flex justify-between items-center">
            <SidebarTrigger/>
            <div className="  flex items-center justify-end py-2 px-1 gap-2 ">
                <Button className="bg-primary-800 ">Connect Wallet</Button>
                <div className="flex gap-3 items-center ">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-primary-200">
                        <Link to="/notifications">
                            <Bell size={20}/>
                        </Link>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-primary-200">
                        <Link to="/profile">
                            <User size={20}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;