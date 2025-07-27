import { useState } from 'react';
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthWallet';

export default function AppPage() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div
      className="min-h-screen bg-[#111827] text-white px-4 sm:px-6 py-6 flex flex-col"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      <div className="w-full max-w-6xl mx-auto">
        {!mnemonic && (
          <div className="mb-6">
            <button
              onClick={async () => {
                const mn = await generateMnemonic();
                setMnemonic(mn);
              }}
              className="bg-[#1f2937] hover:bg-[#374151] active:bg-[#111827] text-white px-6 py-3 text-base rounded-lg shadow transition w-full sm:w-auto"
            >
              Create Seed Phrase
            </button>
          </div>
        )}

        {mnemonic && (
          <>
            <div className="text-lg sm:text-xl bg-[#1f2937] text-[#32cd32] p-4 rounded-xl mb-8 break-words shadow-inner border border-[#2f855a] w-full">
              {mnemonic}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
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
