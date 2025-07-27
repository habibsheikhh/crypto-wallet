import { useState } from 'react';
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthWallet';

export default function AppPage() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div
      className="min-h-screen bg-[#111827] text-white p-6 flex flex-col justify-between"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      <div>
        {/* Show button only if no mnemonic */}
        {!mnemonic && (
          <div className="mb-6">
            <button
              onClick={async () => {
                const mn = await generateMnemonic();
                setMnemonic(mn);
              }}
              className="bg-[#1f2937] hover:bg-[#374151] active:bg-[#111827] text-white px-5 py-2 rounded-lg shadow transition"
            >
              Create Seed Phrase
            </button>
          </div>
        )}

        {/* Show seed phrase and wallets only after seed is generated */}
        {mnemonic && (
          <>
            {/* Seed Phrase */}
            <div className="text-2xl bg-[#1f2937] text-[#32cd32] p-4 rounded-xl max-w-4xl mb-8 break-words shadow-inner border border-[#2f855a]">
              {mnemonic}
            </div>

            {/* Wallets side-by-side */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full lg:w-1/2">
                <SolanaWallet mnemonic={mnemonic} />
              </div>
              <div className="w-full lg:w-1/2">
                <EthWallet mnemonic={mnemonic} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
