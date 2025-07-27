import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { Eye, EyeOff, Trash2, Copy } from "lucide-react";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [walletName, setWalletName] = useState(""); // ✅ new state

  const toggleVisibility = (index) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const deleteWallet = (indexToDelete) => {
    setWallets((prev) => prev.filter((_, i) => i !== indexToDelete));
    setVisibleKeys((prev) => {
      const updated = { ...prev };
      delete updated[indexToDelete];
      return updated;
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className="w-full max-w-4xl space-y-4"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      <div className="flex flex-wrap gap-4 items-center">
        

        {/* ✅ Create wallet button */}
        <button
          onClick={async () => {
            if (!mnemonic) return;
            const seed = await mnemonicToSeed(mnemonic);
            const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const wallet = new Wallet(child.privateKey);

            setWallets((prev) => [
              ...prev,
              {
                address: wallet.address,
                privateKey: wallet.privateKey,
                name: walletName || `Wallet ${currentIndex + 1}`, // ✅ Save name
              },
            ]);
            setCurrentIndex((prev) => prev + 1);
            setWalletName(""); // ✅ Clear input after adding
          }}
          className="bg-gray-800 hover:bg-gray-700 active:bg-black text-white px-5 py-2 rounded-lg shadow transition"
        >
          Add ETH Wallet
        </button>
        {/* ✅ Wallet name input */}
        <input
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          placeholder="Give a name to wallet"
          className="px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition w-full sm:w-auto"
        />
      </div>

      <div className="space-y-4">
        {wallets.map((wallet, i) => {
          const derivationPath = `m/44'/60'/${i}'/0'`;

          return (
            <div
              key={i}
              className="relative bg-gray-800 p-4 rounded-xl text-sm text-green-400 shadow break-words overflow-hidden"
            >
              <button
                onClick={() => deleteWallet(i)}
                className="absolute top-2 right-2 text-green-500 hover:text-red-500"
                title="Delete Wallet"
              >
                <Trash2 size={18} />
              </button>

              {/* ✅ Wallet name displayed */}
              <div className="mb-2 text-white font-semibold">
                 {wallet.name}{" "}
                <span className="text-gray-400">({derivationPath})</span>
              </div>

              <div className="mb-2 flex flex-wrap items-center gap-2">
                <strong>ETH Address:</strong>
                <span className="break-all">{wallet.address}</span>
                <button
                  onClick={() => copyToClipboard(wallet.address)}
                  title="Copy Address"
                  className="text-green-400 hover:text-green-200"
                >
                  <Copy size={14} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <strong>Private:</strong>
                <span className="break-all">
                  {visibleKeys[i] ? wallet.privateKey : "•".repeat(16)}
                </span>
                <button
                  onClick={() => toggleVisibility(i)}
                  className="text-green-400 hover:text-green-200"
                  title="Toggle Visibility"
                >
                  {visibleKeys[i] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {visibleKeys[i] && (
                  <button
                    onClick={() => copyToClipboard(wallet.privateKey)}
                    title="Copy Private Key"
                    className="text-green-400 hover:text-green-200"
                  >
                    <Copy size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
