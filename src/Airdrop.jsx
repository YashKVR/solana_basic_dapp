import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react";

export function Airdrop() {

    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);

    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendAirdropToUser() {
        await connection.requestAirdrop(wallet.publicKey, (amount * 1e9));
        console.log(`Airdropped ${amount} SOL`);
    }

    useEffect(() => {
        async function getBalance() {
            if (wallet.publicKey) {
                let walletBalance = await connection.getBalance(wallet.publicKey);
                setBalance(walletBalance / 1e9);
            }
        }

        getBalance()
    }, [connection, wallet.publicKey]);




    return <div className="text-center mt-10 space-y-5">
        <p className="text-2xl font-bold">Your Balance is: {balance} SOL</p>
        <div className="space-y-3">
            <p>
                <input type="text" placeholder="Amount" onChange={e => setAmount(e.target.value)}
                    className="border border-slate-600"
                />
            </p>
            <button onClick={sendAirdropToUser} className="bg-[#512DA8] text-white text-lg font-bold px-2 py-2 rounded-md hover:bg-[#b299ed] hover:text-black transition-all">Get Airdrop</button>
        </div>

    </div>
}