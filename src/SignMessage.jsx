import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useState } from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();

    const [message, setMessage] = useState();

    async function onClickFunction() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('success', `Message signature: ${bs58.encode(signature)}`);
    }
    return (
        <div className='flex flex-col items-center justify-center mt-10 space-y-3'>
            <p className='text-2xl font-bold'>
                Sign Messages
            </p>
            <p>
                <input type="text" placeholder='Message' onChange={e => setMessage(e.target.value)}
                    className="border border-slate-600" />
            </p>
            <button onClick={onClickFunction}
                className="bg-[#512DA8] text-white text-lg font-bold px-2 py-2 rounded-md hover:bg-[#b299ed] hover:text-black transition-all"
            >
                Sign Message
            </button>
        </div>
    )
}