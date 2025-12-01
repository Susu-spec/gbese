import Loader from "@/components/ui/loader";

export default function FullPageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white">
      <Loader size="lg" ariaLabel="Loading landing page" />
    </div>
  );
}
