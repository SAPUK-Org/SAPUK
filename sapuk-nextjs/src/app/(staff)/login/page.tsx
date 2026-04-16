import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Decorative overlays - span full background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_50%)]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-white/5" />

      {/* Left panel - branding (desktop only) */}
      <div className="relative z-10 hidden lg:flex flex-col justify-between lg:pl-24 lg:py-32 text-white lg:w-[90%]">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to SAP;UK
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-center max-w-md">
          <h1 className="font-fuzzy-bubbles text-4xl md:text-5xl font-bold leading-tight">
            SAP;UK
          </h1>
          <p className="mt-2 text-lg text-white/90">
            Suicide Awareness Prevention UK
          </p>
          <p className="mt-8 text-white/80 leading-relaxed">
            Staff portal. Sign in to manage events, volunteers, and content for
            our community.
          </p>
        </div>
        <div className="text-sm text-white/60">© SAP;UK - Non Profit CIC</div>
      </div>

      {/* Right panel - login form */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="font-fuzzy-bubbles text-3xl sm:text-4xl font-bold text-white">
              SAP;UK
            </h1>
            <p className="text-sm sm:text-base text-white/90 mt-2">
              Suicide Awareness Prevention UK — Staff Portal
            </p>
            <p className="mt-4 text-white/80 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              Staff portal. Sign in to manage events, volunteers, and content
              for our community.
            </p>
          </div>
          <LoginForm />
          <p className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-white/90 hover:text-white transition-colors lg:hidden"
            >
              ← Back to main site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
