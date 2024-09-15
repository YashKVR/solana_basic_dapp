import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { Buffer } from 'buffer';

const SendSol = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    const [to, setTo] = useState("");
    const [amount, setAmount] = useState(0);

    async function sendTokens() {
        window.Buffer = window.Buffer || Buffer;
        const transaction = new Transaction().add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }
    return (
        <div className='flex flex-col items-center justify-center mt-10 space-y-3'>
            <p className='text-2xl font-bold'>Send Solana</p>
            <p>
                <input type="text" placeholder="To" onChange={e => setTo(e.target.value)}
                    className="border border-slate-600" />
            </p>
            <p>
                <input type="text" placeholder="Amount" onChange={e => setAmount(e.target.value)}
                    className="border border-slate-600" />
            </p>
            <button onClick={sendTokens}
                className="bg-[#512DA8] text-white text-lg font-bold px-2 py-2 rounded-md hover:bg-[#b299ed] hover:text-black transition-all"
            >Send</button>
        </div>
    )
}

export default SendSol