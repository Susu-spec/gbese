import { Button } from "@/components/ui/button";
import { CreditProviderCard } from "@/features/main/credit-options/components/CreditProviderCard";
import { useCreditProviders } from "@/features/main/credit-options/hooks"
import { AlertTriangle, LoaderIcon, PackageX } from "lucide-react";

export default function CreditOptionsPage() {
    const { data, isLoading, isError, refetch } = useCreditProviders();

    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col gap-1 md:gap-2">
                <h1 className="font-sora text-primary-800 font-semibold text-xl md:text-3xl ">
                    Credit Options
                </h1>
                <p className="text-sm md:text-base text-primary-950 leading-7.5">
                    Pick your credit. Compare, apply, cash out; na your move!
                </p>
            </div>

            {isLoading && (
                <div className="py-10 w-full flex items-center justify-center">
                    <LoaderIcon className="size-4 animate-spin" />
                </div>
            )}

            {isError && (
                <div className="flex flex-col items-center gap-3 py-10">
                    <AlertTriangle className="text-red-500" size={32} />
                    <p className="text-sm text-gray-600">We couldn't load your data.</p>
                    <Button onClick={() => refetch()}>Tap to Retry</Button>
                </div>
            )}

            {!isLoading && !isError && data?.length === 0 && (
                <div className="flex flex-col items-center gap-3 py-10">
                    <PackageX size={32} className="text-primary-500" />
                    <p className="text-sm text-gray-600">No credit providers available.</p>
                </div>
            )}

            {!isLoading && !isError && data && data.length > 0 && (
                <div className="grid lg:grid-cols-2 gap-6">
                    {data.map((provider) => (
                        <CreditProviderCard key={provider.id} creditProvider={provider} />
                    ))}
                </div>
            )}
        </div>
    )
}

