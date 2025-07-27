export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center px-4 py-8 relative"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 leading-tight">
        🔐 Decentralized Wallet Generator
      </h1>

      <p className="text-gray-400 text-base sm:text-lg text-center max-w-sm sm:max-w-xl mb-8">
        Instantly generate secure seed phrases and manage multiple Solana & Ethereum wallets — all in your browser.
      </p>

      <a
        href="/app"
        className="w-full max-w-xs sm:max-w-md bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md text-center hover:bg-black hover:text-white border-2 border-white transition"
      >
        Get Started →
      </a>

      <footer className="absolute bottom-4 text-xs sm:text-sm text-gray-500 text-center px-4">
        Created with <span className="text-red-500">❤️</span> by{" "}
        <span className="text-white font-semibold">Mohammad Habib Ashraf</span>
      </footer>
    </div>
  );
}
