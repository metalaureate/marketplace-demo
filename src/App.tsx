import "./App.css";

import {
  createClient as createWagmiClient,
  configureChains,
  WagmiConfig,
  chain
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import Sweep from "./sweep";
import { createClient } from "@reservoir0x/reservoir-kit-client";

const { chains } = configureChains([chain.mainnet], [publicProvider()]);

const client = createWagmiClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true
      }
    })
  ]
});

createClient({
  apiBase: "https://api.reservoir.tools",
  apiKey: "f4be4eb1-61ae-5b25-a53a-55765bc114bc"
});

export default function App() {
  return (
    <WagmiConfig client={client}>
      <div className="App">
        <header className="App-header">Buy/Sweep Demo</header>
        <Sweep />
      </div>
    </WagmiConfig>
  );
}
