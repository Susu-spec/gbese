import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { User } from "lucide-react";

const Header = () =>  {
    return (
        <div className="max-h-[80px] flex items-center justify-end py-2 px-1 gap-2 w-full bg-white">
            <Button className="bg-primary">connect</Button>
            <div className="flex gap-3 items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-2 border-blue-200">
                    <Bell size={20}/>
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-2 border-blue-200">
                    <User size={20}/>
                </div>
            </div>
        </div>
    )
}

export default Header;