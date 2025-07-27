import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Eye, EyeOff, Trash2, Copy } from "lucide-react";

const SOLANA_RPC = "https://api.devnet.solana.com"; // or devnet: https://api.devnet.solana.com

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [walletName, setWalletName] = useState("");
  const [balances, setBalances] = useState({});

  const toggleVisibility = (index) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const deleteWallet = (index) => {
    setWallets((prev) => prev.filter((_, i) => i !== index));
    setVisibleKeys((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
    setBalances((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const checkBalance = async (publicKey, index) => {
    try {
      const connection = new Connection(SOLANA_RPC);
      const pubKey = new PublicKey(publicKey);
      const lamports = await connection.getBalance(pubKey);
      const sol = lamports / 1e9;
      setBalances((prev) => ({ ...prev, [index]: sol.toFixed(6) }));
    } catch (err) {
      console.error("Balance fetch error:", err);
      setBalances((prev) => ({ ...prev, [index]: "Error" }));
    }
  };

  return (
    <div
      className="w-full max-w-4xl space-y-4"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      <div className="flex flex-wrap gap-4 items-center">
        <button
          onClick={async () => {
            if (!mnemonic) return;

            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const keypair = Keypair.fromSecretKey(
              nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
            );

            setWallets((prev) => [
              ...prev,
              {
                index: currentIndex,
                publicKey: keypair.publicKey.toBase58(),
                privateKey: Buffer.from(keypair.secretKey).toString("hex"),
                name: walletName || `Wallet ${currentIndex + 1}`,
              },
            ]);
            setCurrentIndex((prev) => prev + 1);
            setWalletName("");
          }}
          className="bg-gray-800 hover:bg-gray-700 active:bg-black text-white px-5 py-2 rounded-lg shadow transition"
        >
          Add Solana Wallet
        </button>

        <input
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          placeholder="Give a name to wallet"
          className="px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition w-full sm:w-auto"
        />
      </div>

      <div className="space-y-4">
        {wallets.map((wallet, i) => (
          <div
            key={i}
            className="relative bg-gray-800 p-4 rounded-xl text-sm text-purple-300 shadow"
          >
            <div className="mb-3 text-purple-200 text-base font-semibold">
              {wallet.name}{" "}
              <span className="text-xs text-purple-400">
                (m/44'/501'/{wallet.index}'/0')
              </span>
            </div>

            <button
              onClick={() => deleteWallet(i)}
              className="absolute top-2 right-2 text-purple-400 hover:text-red-500 transition"
              title="Delete Wallet"
            >
              <Trash2 size={16} />
            </button>

            <div className="mb-2 overflow-x-auto break-all">
              <strong>SOL Public:</strong> {wallet.publicKey}
              <button
                onClick={() => copyToClipboard(wallet.publicKey)}
                className="ml-3 text-purple-400 hover:text-purple-200 transition"
                title="Copy Public Key"
              >
                <Copy size={14} />
              </button>
            </div>

            <div className="overflow-x-auto break-all">
              <strong>Private:</strong>{" "}
              {visibleKeys[i] ? wallet.privateKey : "•".repeat(16)}
              <button
                onClick={() => toggleVisibility(i)}
                className="ml-3 text-purple-400 hover:text-purple-200 transition"
                title="Toggle Visibility"
              >
                {visibleKeys[i] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {visibleKeys[i] && (
                <button
                  onClick={() => copyToClipboard(wallet.privateKey)}
                  className="ml-3 text-purple-400 hover:text-purple-200 transition"
                  title="Copy Private Key"
                >
                  <Copy size={14} />
                </button>
              )}
            </div>

            {/* ✅ Balance Section */}
            <div className="mt-4 text-purple-200 text-sm">
              Balance:{" "}
              <span className="text-purple-100 font-mono">
                {balances[i] !== undefined ? `${balances[i]} SOL` : "—"}
              </span>
              <button
                onClick={() => checkBalance(wallet.publicKey, i)}
                className="ml-4 text-xs px-3 py-1 rounded-full bg-purple-900 text-purple-300 hover:bg-purple-800 transition"
              >
                Check Balance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
