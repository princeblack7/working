## 📘 Project Overview: BOT Chain DeFAI

**BOT Chain DeFAI** is a **DeFi-inspired AI assistant** that helps users seamlessly interact with the **BOT Chain testnet** via **Telegram**. It combines the accessibility of chat interfaces with the power of decentralized finance tools — making Web3 more approachable for everyone.

### 🧩 What Problem Are We Solving?

Interacting with DeFi platforms often requires:

* Deep technical knowledge
* Manual wallet operations
* Navigation across multiple dApps

**BOT Chain DeFAI** solves this by letting users **chat their way through DeFi actions** like:

* Claiming test tokens
* Sending USDT or BOT
* Topping up phone airtime
* Checking balances
* Viewing wallet addresses
* (Coming soon) Swapping tokens or requesting airdrops

All of this is done through simple Telegram commands, powered by **Mastra AI** and the **BOT Chain-compatible wallet tools**.

---

### 🔐 Custody Model: A Transitional Hybrid

This version of BOT Chain DeFAI uses a **custodial model**, where user wallets are managed server-side. This:

* Makes onboarding easy for non-technical users
* Enables smooth AI execution of blockchain actions

However, it is **not fully decentralized**. In the spirit of DeFi, **future versions** will:

* Allow users to connect their own wallets (via WalletConnect, BO Wallet, or local key storage)
* Ensure full **non-custodial control**

> ⚠️ **Note:** As such, we position this tool as "DeFi-inspired" rather than a strict DeFAI implementation.

---

Here’s a complete **"How to Set Up the Project Locally"** section you can add to your `README.md` for the **BOT Chain DeFAI** Telegram bot:

---

## 🛠️ Local Setup

Follow these steps to run the BOT Chain DeFAI Telegram bot locally:

### 📦 Prerequisites

Ensure you have the following installed:

* Node.js `>=18`
* `pnpm` (recommended) or `npm`
* SQLite (or just use LibSQL with file storage)
* A Telegram bot token from [@BotFather](https://t.me/BotFather)
* Reloadly account (for airtime)
* BOT Chain wallet and RPC access

---

### 🔑 1. Clone the repo

```bash
git clone https://github.com/your-username/botchain-defai-bot.git
cd botchain-defai-bot
```

---

### 📁 2. Install dependencies

```bash
pnpm install
# or
npm install
```

---

### 🔐 3. Configure environment variables

Create a `.env` file in the root with the following variables:

```env
TELEGRAM_BOT_TOKEN=your_telegram_token
RELOADLY_CLIENT_ID=your_reloadly_client_id
RELOADLY_CLIENT_SECRET=your_reloadly_client_secret
RELOADLY_OPERATOR_ID=your_reloadly_operator_id
NVIDIA_API_KEY=your_nvidia_api_key
OPENROUTER_URL=https://integrate.api.nvidia.com/v1/chat/completions
OPENROUTER_MODEL=minimaxai/minimax-m3
USDT_CONTRACT_ADDRESS=
WALLET_PRIVATE_KEY=
TREASURY_ADDRESS=
```

---

### 💽 4. Start the bot locally

```bash
pnpm run dev
# or
npm run dev
```

The bot will start and respond to messages on Telegram.

---

### 🧠 Optional: Use with Ollama or Mastra locally

* If you're running **Mastra AI tools**, make sure `mastra.db` is present or automatically created.
* Ollama can be used to run local LLMs. Update your LLM config in `openrouterLLM.ts` or use Mastra’s `ollamaLLM()` adapter.



---

## 🚀 Usage Guide

## Featured commands

- /start — welcome and quick help
- /balance — check wallet balance
- /mywallet — view wallet address
- /claim — claim test USDT
- /faucet — request BOT test tokens
- /airtime — buy airtime with supported flow
- /transferusdt — send USDT
- /transferbot — send BOT

## Demo experience

A user can simply type a message like:

- “What’s my balance?”
- “Claim some test USDT”
- “Send airtime to 08012345678”
- “Show my wallet address”

The assistant routes the request into the appropriate command flow and responds in Telegram.

## Architecture

The app combines:

- Telegram bot integration for user interaction
- A Mastra-based AI agent for intent handling and conversational flow
- Command modules for balances, claims, transfers, faucet requests, and airtime
- Wallet and blockchain utility layers for BOT Chain-compatible operations


---

### `/faucet`

Get 1 BOT test token from the faucet.
🔁 Can only be used once per account/address every 24 hours.

> AI Output Example:

```
Here's how to get test BOT tokens:
✅ Type: /faucet
```

---

### `/claim`

Claim 1000 kUSDT from the claim faucet contract.
Useful for testing transfers or airtime topups.

> AI Output Example:

```
You can claim 1000 kUSDT once every 24 hours:
✅ Type: /claim
```

---

### `/balance`

Check the current balance of your wallet (BOT + USDT).

> AI Output Example:

```
Your wallet balance is:
- 1.00 BOT
- 1000.00 kUSDT
✅ Use: /balance
```

---

### `/mywallet`

Displays your wallet address for receiving tokens or cross-chain tests.

> AI Output Example:

```
Here’s your wallet address:
0x1234...abcd
✅ Use: /mywallet
```

---

### `/transferusdt <receiver> <amount>`

Send USDT (kUSDT) to another wallet or user.
You can use either a wallet address or @Telegram username.

> Example:

```
/transferusdt 0xabc...123 500
/transferusdt @joe 100
```

> AI Output Example:

```
To send USDT, type:
✅ /transferusdt @username 100
```

---

### `/transferbot <receiver> <amount>`

Send BOT (native token) to any wallet or user.

> Example:

```
/transferbot 0xabc...123 1.5
/transferbot @joe 2.0
```

> AI Output Example:

```
To transfer BOT, type:
✅ /transferbot 0xWalletAddress 1.5
```

---

### `/airtime <phone> <amount> NGN`

Buy Nigerian airtime with USDT from your wallet.
Supported via Reloadly API and treasury wallet.

> Example:

```
/airtime 08012345678 1500 NGN
```

> AI Output Example:

```
To recharge your line, try:
✅ /airtime 08123456789 1000 NGN
```

---

### `/swap <amount> <fromToken> <toToken>` *(Coming soon)*

Swap one token to another (e.g., USDT → BOT).
Will route via BOT Chain DEX or supported aggregator.

> Example:

```
/swap 1000 kUSDT KAIA
```

> AI Output Example:

```
To swap tokens, type:
✅ /swap 1000 USDT BOT
```

---

### `/airdrop` *(Coming soon)*

Get test airdrops from supported testnet campaigns.

> AI Output Example:

```
Airdrop is coming soon. Stay tuned! 🚀
```

---

## 💡 How It Works

The bot uses the [Mastra AI Framework](https://github.com/mastra-ai/mastra) and BOT Chain-compatible wallet utilities to:

* Parse natural language requests
* Map them to Web3 actions
* Execute smart contract calls
* Return clean, Telegram-friendly responses

Each feature is implemented as a **Mastra Tool**, with consistent output patterns and fallback handling.

---

## 📦 Tech Stack

* **Telegram Bot API**
* **Mastra AI Framework**
* **BOT Chain wallet integration** (ERC20, explorer, native token tools)
* **Reloadly API** (airtime)
* **SQLite + LibSQLStore** (for memory & state)
* **Node.js + TypeScript**

---

## 🛡️ Security Notice

This early version **manages user private keys server-side** for simplicity. Users should **not treat these wallets as secure** for holding real assets. This tool is meant for:

* Testnet
* Hackathons
* Learning
* Fast DeFi prototyping


