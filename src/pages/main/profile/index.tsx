import { Camera } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useUser } from "@/features/main/dashboard/hooks/useUser";


type TabValue = "personal-information" | "security-settings" ;

const Profile = () => {
    const [tabValue, setTabValue] = useState<TabValue>("personal-information");
    const [showModal, setShowModal] = useState<boolean | null>(false);

    const {userQuery} = useUser();

    const isLoading = userQuery.isPending;
    
    const user = useSelector((state: RootState) => state.user?.profile);

    const handleTabChange = (value: TabValue) => {
        setTabValue(value);
    }

    const handleShowModal = () => {
        setShowModal((prev) => !prev)
        console.log(showModal)
    }


    return (
        <div className="w-full p-2">
            <h2 className="py-2 text-3xl ">Personal Information</h2>
    
            <div className="p-2 flex flex-col ">
                <div className="w-full px-6 items-center flex bg-white gap-10 mb-4 ">
                    <div onClick={() => handleTabChange("personal-information")} className={tabValue === "personal-information" ? "border-b-2 border-primary-800 h-18 flex items-center " : ""}>
                        <p>Personal</p>
                    </div>
                    <div onClick={() => handleTabChange("security-settings")} className={tabValue === "security-settings" ? "border-b-2 border-primary-800 h-18 flex items-center" : ""}>
                        <p>Security</p>
                    </div>
                </div>

                {tabValue === "personal-information" ? (
                    <div className="bg-white flex flex-col gap-8 p-8">
                        <div className="flex items-center gap-2">
                            <div className="w-36 h-36 rounded-xl flex items-center justify-center bg-primary-200">
                                <Camera size={44} stroke="#fff" strokeWidth={1}/>
                            </div>
                            <p className="font-bold text-xl">{isLoading ? "Loading..." : user?.first_name + " " + user?.last_name }</p>
                        </div>
                        <div className="">
                            <div className="flex justify-between w-full">
                                <label htmlFor="fullName" className="w-2/3">Full Name</label>
                                <input type="text" id="fullName" name="fullName" placeholder="Jones Charles" className="w-1/3" />
                            </div>
                            <div className="flex justify-between w-full">
                                <label htmlFor="email" className="w-2/3">Email Address</label>
                                <input type="email" id="email" name="email" placeholder={isLoading ? "Loading..." : user?.email || "User"} className="w-1/3" />
                            </div>
                        </div>
                    </div>
                ): (
                    <div className="bg-white flex flex-col gap-8 p-8">
                        <div className="">
                            <h2>Verified Information</h2>
                            <div className="flex justify-between w-full">
                                <label htmlFor="fullName" className="w-2/3">Full Name</label>
                                <input type="text" id="fullName" name="fullName" placeholder="Jones Charles" className="w-1/3" />
                            </div>
                            <div className="flex justify-between w-full">
                                <label htmlFor="email" className="w-2/3">Email Address</label>
                                <input type="email" id="email" name="email" placeholder="jones.charles@example.com" className="w-1/3" />
                            </div>
                        </div>
                         <div className="">
                            <h2>Password & Pin</h2>
                            <div className="flex justify-between w-full">
                                <label htmlFor="fullName" className="w-2/3">Pin</label>
                                <p className="w-1/3" onClick={handleShowModal}>Change Pin</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <label htmlFor="email" className="w-2/3">Email Address</label>
                                <input type="email" id="email" name="email" placeholder="jones.charles@example.com" className="w-1/3" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile;