import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import { Airdrop } from './Airdrop';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { SignMessage } from './SignMessage';
import SendSol from './SendSol';

function App() {


  return (
    <div className='px-10 py-2'>
      <ConnectionProvider endpoint={import.meta.env.VITE_DEVNET_RPC_URL}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className='flex justify-between'>
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>

            { /* Your app's components go here, nested within the context providers. */}
            <Airdrop />
            <SignMessage />
            <SendSol />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App
