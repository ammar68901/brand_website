import Link from "next/link";

export default function TopBar() {
  return (
    <div className="w-full bg-black py-2"> 
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between text-white text-sm sm:text-base">
        {/* Left: Phone (only large screens) */}
        <div className="hidden lg:block font-medium">
          📞 +92 300 1234567
        </div>

        {/* Center: Free Delivery (always visible) */}
        <div className="flex-1 text-center font-medium">
          🚚 Free Delivery All Over Pakistan
        </div>

        {/* Right: Shop name (only large screens) */}
        <div className="hidden lg:block font-medium">
          <Link href="/about">AboutUs 👤</Link>
        </div>
      </div>
    </div>
  );
}


