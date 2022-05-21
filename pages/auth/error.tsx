import LogoWithText from "@/components/LogoWithText";
import { useRouter } from "next/router";

export default function Login() {
  const { query } = useRouter();
  return (
    <div className="min-h-screen bg-gray-100  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <LogoWithText />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{query.error}</h2>
        </div>
      </div>
    </div>
  );
}
