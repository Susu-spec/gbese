import { useState } from "react";


type TabValue = "personal-information" | "security-settings" ;

const Profile = () => {
    const [tabValue, setTabValue] = useState<TabValue>("personal-information");

    const handleTabChange = (value: TabValue) => {
        setTabValue(value);
    }

    return (
        <div className="w-full p-2">
            <h2 className="py-2 text-3xl ">Personal Information</h2>
            

            <div className="p-2 flex flex-col bg-white w-full">
                <div className="w-[30vw] flex gap-3 mb-4 ">
                    <div onClick={() => handleTabChange("personal-information")} className={tabValue === "personal-information" ? "border-b-2 border-primary-800 " : ""}>
                        <p>Personal</p>
                    </div>
                    <div onClick={() => handleTabChange("security-settings")} className={tabValue === "security-settings" ? "border-b-2 border-primary-800" : ""}>
                        <p>Security</p>
                    </div>
                </div>

                {tabValue === "personal-information" ? (
                    <div className="flex gap-4 w-full">
                        <div className="w-44 h-44 rounded-full overflow-hidden flex items-center justify-center bg-primary-100 mr-8">
                            <img src="" alt="" className="object-contain" />
                        </div>
                        <div className="bg-red-300 w-72">
                            <div className="flex flex-col gap-1">
                                <label>First Name</label>
                                <input type="text" placeholder="Enter your first name" value={"Peter"} disabled />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>First Name</label>
                                <input type="text" placeholder="Enter your first name" value={"Peter"} disabled />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Last Name</label>
                                <input type="text" placeholder="Enter your last name" value={"Parker"} disabled />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Email Address</label>
                                <input type="email" placeholder="Enter your email address" value={"peter.parker@example.com"} disabled />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="Enter your phone number" value={"+1234567890"} disabled />
                            </div>
                        </div>
                    </div>
                ): (
                    <div>
                        <p>Security Settings Content</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile;