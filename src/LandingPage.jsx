export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-8 relative"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
        🔐 Decentralized Wallet Generator
      </h1>

      <p className="text-gray-400 text-lg md:text-xl text-center max-w-2xl mb-10">
        Instantly generate secure seed phrases and manage multiple Solana & Ethereum wallets — all in your browser.
      </p>

      <a
        href="/app"
        className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-black hover:text-white border-2 border-white transition"
      >
        Get Started →
      </a>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-gray-500 text-center">
        Created with <span className="text-red-500">❤️</span> by{" "}
        <span className="text-white font-semibold">Mohammad Habib Ashraf</span>
      </footer>
    </div>
  );
}
