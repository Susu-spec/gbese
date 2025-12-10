import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useUser } from "@/features/main/dashboard/hooks/useUser";
import { InfoRow } from "@/features/main/profile/component/RowCard";
import { Link } from "react-router";
import AvatarJpeg from "@/assets/images/Avatar.jpg"

type TabValue = "personal-information" | "security-settings";

const SectionCard = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => (
  <div className="bg-white flex flex-col gap-6 p-8">
    {title && <h2 className="text-lg font-semibold">{title}</h2>}
    {children}
  </div>
);

const Profile = () => {
  const [tabValue, setTabValue] = useState<TabValue>("personal-information");

  const { userQuery } = useUser();
  const isLoading = userQuery.isPending;

  const user = useSelector((state: RootState) => state.user?.profile);

  const handleTabChange = (value: TabValue) => setTabValue(value);

  const isKycVerified = user?.kyc_status === "verified";

  return (
    <div className="w-full flex flex-col gap-4 md:gap-8">
        <h1 className="text-xl md:text-3xl text-primary-800 font-semibold">Personal Information</h1>

        <div className="p-2 flex flex-col">
            <div className="w-full px-6 flex items-center bg-white gap-10 mb-4">
            <button
                onClick={() => handleTabChange("personal-information")}
                className={
                tabValue === "personal-information"
                    ? "border-b-2 border-primary-800 h-18 flex items-center font-semibold"
                    : ""
                }
            >
                <p>Personal</p>
            </button>

            <button
                onClick={() => handleTabChange("security-settings")}
                className={
                tabValue === "security-settings"
                    ? "border-b-2 border-primary-800 h-18 flex items-center font-semibold"
                    : ""
                }
            >
                <p>Security</p>
            </button>
            </div>

            {/* PERSONAL INFORMATION SECTION */}
            {tabValue === "personal-information" ? (
                <SectionCard>
                    <div className="flex flex-col md:flex-row lg:flex-row items-center gap-2">
                        <div className="w-36 h-36 rounded-xl flex items-center justify-center bg-primary-200">
                            <img src={AvatarJpeg} alt="User Avatar" className="rounded-xl"/>
                        </div>

                        <p className="font-bold text-xl">
                            {isLoading
                            ? "Loading..."
                            : `${user?.first_name || ""} ${user?.last_name || ""}`}
                        </p>
                    </div>

                    <InfoRow
                    label="Full Name"
                    value={`${user?.first_name || ""} ${user?.last_name || ""}`}
                    />

                    <InfoRow label="Email" value={user?.email} />
                </SectionCard>
            ) : (
                // SECURITY SETTINGS SECTION
                <SectionCard>
                    <h2 className="text-lg font-semibold">Verified Information</h2>

                    <InfoRow label="Address" value={user?.address} />
                    <InfoRow label="City" value={user?.city} />
                    <InfoRow label="State" value={user?.state} />
                    <InfoRow label="Country" value={user?.country} />
                    <InfoRow label="Postal Code" value={user?.postal_code} />
                    {user?.occupation && <InfoRow label="Occupation" value={user?.occupation?.charAt(0)?.toUpperCase() + user?.occupation?.slice(1)} />}

                    <div className="flex justify-between w-full items-center">
                    <label className="w-2/3">KYC Status</label>
                    <Link to="/kyc/personal-info" className="w-1/3">
                        <button
                            disabled={isKycVerified}
                            className={`w-full max-w-fit py-2 rounded-4xl px-4 text-sm ${
                            isKycVerified
                                ? "bg-green-200 text-green-700 cursor-not-allowed"
                                : "bg-primary-800 text-white"
                            }`}
                        >
                            {isKycVerified ? "Verified" : "Verify Status"}
                        </button>
                    </Link>
                    </div>

                    <h2 className="text-lg font-semibold">Password & Pin</h2>

                    <div className="flex justify-between w-full">
                    <label className="w-2/3">Pin</label>
                    <p className="w-1/3 cursor-pointer" >
                        Change Pin
                    </p>
                    </div>

                    <InfoRow label="Email" value={user?.email} />
                </SectionCard>
            )}
        </div>
        </div>
    );
};

export default Profile;
