import { Button } from "../../components/ui/button";
import { Bell } from "lucide-react";
import { User } from "lucide-react";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { Link } from "react-router";

const Header = () =>  {
    return (
        <div className="fixed md:pl-64 inset-x-0 max-h-22 top-0 z-20 w-full bg-white ">
            <div className="flex justify-between items-center mx-auto max-w-5xl w-full py-4 px-6">
                <SidebarTrigger className="md:hidden flex justify-start"/>
                <div className="md:ml-auto flex items-center justify-end py-2 gap-2 ">
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
        </div>
    )
}

export default Header;