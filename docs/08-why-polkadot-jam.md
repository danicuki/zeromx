# 08 — Why Polkadot, What It Gives Us, and What It Does Not

**Position, in four sentences.** ZeroMX is not a product that only JAM makes possible, and its privacy does not depend on any blockchain. What a chain adds is one specific thing: a key directory and an operator list that nobody can rewrite, including the ZeroMX team. Polkadot is chosen for that job because its pieces fit and because its ecosystem now measures success in people using private products, which is exactly what ZeroMX is. JAM is the long-term home for the heaviest part of the work and is not on the critical path.

People in the Polkadot and JAM ecosystem will check every claim below. The pitch has to survive that.

The line to use in a deck and on the website: **"Privacy does not depend on a blockchain. Polkadot is what keeps the directory, the operator list and your name out of any company's hands, including ours."**

---

## 1. What the Control Plane Actually Has to Do

| Job | Detail | Volume |
| :--- | :--- | :--- |
| Keep the key directory | Append-only log of user key records, relay lists and storage targets. | Rare writes |
| Keep the operator registry and measurement allowlist | Small state. | Rare writes |
| Verify relay attestation | **AMD SEV-SNP:** report signed with ECDSA P-384 / SHA-384, under an RSA-4096-PSS vendor chain. **Intel TDX:** quote and PCK chain signed with ECDSA **P-256**; measurements are SHA-384. Plus vendor collateral (TCB info, revocation lists). | Per relay, per epoch |
| Be verifiable from a client | The client must not have to believe whoever serves the data. | Every send |
| Hold operator bonds | And later verify batched rate-limit proofs. | Per epoch |

No email and no per-email data touches the chain. The on-chain workload is small, which means **chain cost is not the bottleneck on any platform.**

---

## 2. Is This Something Only JAM Makes Possible?

**No.** Three checks:

1. **Privacy.** Remove the chain and run the directory as a signed append-only log. The relay still seals, the storage still holds only sealed files, and only the user's devices can open them. Confidentiality is identical.
2. **Cost.** The chain is touched once per relay per epoch and once per key change. It is never touched per user per month or per message. With 20 relays verified daily, the same work on an Ethereum rollup costs on the order of tens of dollars per month in total (our estimate, unbenchmarked). JAM coretime has no price yet. A saving on a line that is already near zero does not make a product viable, so **"JAM makes this economically possible" is not a claim we make.**
3. **Capability.** Everything the control plane needs can be built today on other platforms (section 7).

**What a chain does change** is who has to be trusted for the directory. With a log we run ourselves, users can detect that we forked it but cannot prevent it. With the directory in chain state, we cannot fork it at all. For a system whose whole point is that no single company holds your mailbox, that is worth having, and it is the only thing we claim for it.

### The earlier "only JAM" argument, claim by claim

The argument circulating for this project made eleven checkable claims. Verdicts:

| # | Claim | Verdict | What is actually true |
| :- | :--- | :--- | :--- |
| 1 | On-chain attestation proves a relay operator did not read RAM. | **False** | Attestation shows which code booted on genuine silicon. An operator with physical access can read memory or extract attestation keys. See [07, section 4](07-threat-model-and-limits.md). |
| 2 | SEV-SNP and TDX rely on P-384 and RSA-4096. | **Half right** | True for SEV-SNP. TDX quotes use ECDSA P-256. |
| 3 | The EVM has no precompiles for this, verification costs tens of millions of gas, and projects are forced onto centralized off-chain provers. | **Overstated** | The EVM has a P-256 precompile (EIP-7951 on Ethereum L1 since the Fusaka upgrade, RIP-7212 on rollups before that) and a modular-exponentiation precompile that makes RSA practical. Intel SGX/TDX quotes are verified fully on-chain today for roughly 3 to 4 million gas, or about 300 thousand gas through a zkVM proof. P-384 and SHA-384 have no precompile, so SEV-SNP is expensive natively and usually goes the proof route. A proof is checked on-chain, so the prover is not trusted. The real costs are minutes of proving latency and a liveness dependency. |
| 4 | `Refine` gives seconds of near-native RISC-V execution, so ordinary `no_std` Rust crates verify raw quotes directly. | **Sound, unbenchmarked** | From the JAM Gray Paper: `G_R = 5,000,000,000` PVM gas per 6-second core slot against `G_A = 10,000,000` for `Accumulate`. Exact instruction counts for SEV-SNP and TDX chains still need benchmarking (`ZMX-033`). |
| 5 | Megabytes of transient evidence in, a few bytes of state out. Only JAM handles that asymmetry. | **Partly** | Refine/Accumulate fits the shape well. Ethereum blobs also carry transient data, though contracts cannot read them directly. And ZeroMX does not have megabytes per user. |
| 6 | Smoldot gives a JAM service a trustless light client inside a browser. | **False today** | Smoldot is a Substrate light client. JAM has no production light client. Smoldot does work today for the Polkadot relay chain and parachains, including Polkadot Hub. |
| 7 | Ethereum and Solana have no browser light client, so clients must trust an RPC provider. | **False for Ethereum L1** | Helios is an Ethereum light client that compiles to WebAssembly and verifies an untrusted RPC. Roughly true for Solana. |
| 8 | A P2P light client stops the network learning who emails whom. | **False as stated** | Any client that asks a remote node for one specific key reveals that lookup to the node. Lookup privacy needs its own design ([02, section 3.3](02-technical-specification.md)). |
| 9 | A JAM service needs no collators, deploys permissionlessly, and scales across cores. | **True in design, with a footnote** | Someone still runs a builder that assembles work packages and buys coretime. PVM smart contracts on Polkadot Hub have been on mainnet since early 2026, also with no chain to run. |
| 10 | Staking yield makes the product free forever. | **False** | See [03, Model B](03-business-model.md). |
| 11 | Chain cost per user: dollars on an L2, under two cents on JAM. | **Unsupported** | JAM mainnet coretime has no price yet, and our on-chain work is per relay per epoch, which is cheap anywhere. |

---

## 3. Why Polkadot, Then

Four reasons, in order of weight. The first two are business reasons and are presented as such.

1. **Strategy alignment and distribution.** Polkadot's strategy "Products and Privacy for People" was approved by referendum 1954 on 11 November 2026 and published on 17 November 2026. It measures success in people using products, and its flagship is the Polkadot app with private messaging and digital cash. A private mailbox that ordinary people use daily is the kind of product that strategy asks for. Being in the first wave of real products on the platform means sharing its launch attention instead of acquiring every user alone.
2. **Funding.** A product that brings daily users and DOT demand is a legitimate treasury proposal (section 8).
3. **Technical fit.** Contracts on Polkadot Hub hold the directory today. `.dot` names give a human-readable handle and pin application code on-chain. Proof of Personhood gives anti-abuse without a payment. JAM's `Refine` / `Accumulate` split matches attestation checking (section 6).
4. **The team builds JAM.** The founder works on a JAM implementation, so the long-term target is one we can deliver on.

**The risk we accept:** several of these pieces are in testnet or have no date (section 4). The founder's stated position is to accept that risk for the distribution, and to keep the option to leave. That option is real only because of section 5.

---

## 4. What Polkadot Offers Today, and How ZeroMX Uses Each Piece

Status as read from public sources in November 2026. Anything marked unverified is tested before it is promised.

| Piece | Status | Use in ZeroMX | Needed for launch? |
| :--- | :--- | :--- | :--- |
| **Contracts on Polkadot Hub** (PVM, `pallet-revive`) | Mainnet since early 2026 | Key directory, operator registry, measurement allowlist | Testnet mirror in the alpha, mainnet in the beta |
| **Light client for Hub state** (Smoldot) | Works for Polkadot chains. Proofs of contract storage unverified (`ZMX-033`) | Clients verify the directory without trusting an RPC endpoint | No. Two RPC endpoints until confirmed |
| **`.dot` names (DotNS)** | Registry is contract state on Polkadot Hub. A name carries a content record | Handle that points to a key record. Pins the code of the ZeroMX Product | No |
| **Product platform** (Product SDK, hosts: Polkadot Desktop, Polkadot App, Polkadot Web) | Devnet since July 2026. The Polkadot app has no mainnet date | The ZeroMX Product: the same account inside the Polkadot hosts | No. Spike in alpha (`ZMX-037`) |
| **Proof of Personhood** (People chain) | Used by the Polkadot app. Use from a third-party app unverified | One free tier per person. Outbound anti-abuse without a payment | No |
| **dotUSD and DOT** | dotUSD approved by referendum 1944 | Optional payment. Operator bonds. Optional stake instead of a subscription | No |
| **Levity** (Bulletin Chain + HOP) | Testnet. Mainnet announced for "the coming months" | Experimental arrival box. Hosting the Product bundle | No |
| **Statement Store** | 512-byte ephemeral statements on the People chain | Candidate for opaque wake-up hints between devices | No |
| **JAM** | No mainnet date. A 12 to 20 month estimate was given in June 2026. A browser light-client proof of concept exists | Target home for attestation verification and the directory | No |

Sources: [Polkadot's new strategy](https://polkadot.com/blog/polkadots-new-strategy/), [DotNS name mechanism](https://docs.polkadot.com/reference/apps/infrastructure/dotns/name-mechanism/), [DotNS architecture](https://docs.polkadot.com/reference/apps/infrastructure/dotns/architecture/), [Product SDK cloud storage](https://paritytech.github.io/product-sdk/api/cloud-storage/).

---

## 5. Using the Infrastructure Without Depending on the Polkadot App

A product should not depend on someone else's application. The rule in ZeroMX:

> **ZeroMX talks to Polkadot's public networks directly. The Polkadot app is a showcase and one more client, never a requirement.**

- **Chains are public infrastructure.** The Bridge and the ZeroMX app read and write the directory contract themselves, through a light client or RPC. No host application is involved.
- **The user never needs a wallet to receive mail.** Directory updates are signed by a key derived from the user's root secret. Transaction fees are paid by the service on the user's behalf, or by the user if they prefer.
- **The Product is additive.** People who already live in the Polkadot hosts find ZeroMX there and use the same account. Everyone else never sees a Polkadot screen.
- **If the Polkadot app changes or is discontinued,** no user loses an address, a key, a mailbox or a client.
- **If Polkadot itself had to be left,** the directory is one adapter. The data model already runs as a signed log, and a contract on another chain is a few weeks of work. The relay, the sealed format, the storage adapters and the clients do not change. This is the exit, and it is why accepting the platform risk is reasonable.

**One open dependency, stated:** Proof of Personhood is obtained through the Polkadot app today. Whether a third-party app can use it without sending the user through the Polkadot app at least once is unverified. Until it is, the free tier is a plan, not a promise, and paid accounts need nothing from the Polkadot app.

### Levity as mail storage: the honest assessment

Polkadot has a storage solution, so the obvious question is whether the mailbox can live there.

| Property (November 2026) | Consequence for mail |
| :--- | :--- |
| Retention of about two weeks unless renewed | Works for an arrival box. A permanent archive would need constant renewal. |
| Reads are open to anyone who knows the content identifier | Every sealed file is public ciphertext forever. A key stolen years later opens copies anyone may have kept ([07, L8](07-threat-model-and-limits.md)). |
| Write access by authorization, tied to verified personhood or an operator-run authorizer. The mainnet model is still being finalized | Relays writing on a user's behalf need an authorization path that does not exist yet. |
| Transaction limit of a few MiB, larger files chunked up to tens of MiB | Covers most mail. Large attachments need chunking. |
| Designed for a limited number of users. A public showcase stored about 1 GB in total | Not sized for mail archives. A paid capacity layer is still being developed. |

**Decision:** Levity is an opt-in, experimental arrival box after its mainnet, and the place the Product bundle is hosted. The archive lives in ZeroMX Storage or the user's own bucket. If Levity gains private reads or a paid capacity layer, this is revisited.

---

## 6. What JAM Genuinely Adds

1. **An execution model shaped like the heaviest job.** Stateless verification runs in-core in `Refine`. Only the result reaches chain state in `Accumulate`. Attestation evidence, vendor collateral and proof batches are that kind of input.
2. **No dependency on precompiles.** Verification is ordinary Rust compiled to PVM. P-384, RSA-PSS, SHA-384, a future quote format, post-quantum signatures or a new proof system need no protocol upgrade and no proving service. Hardware vendors change formats, and the control plane's roadmap should not be tied to another chain's precompile decisions.
3. **A service, not a chain.** No validator set or collator set to bootstrap. Coretime is bought as needed.
4. **One security domain.** The directory, operator bonds and later slashing sit under Polkadot's validators and settle in DOT, with no bridge in the trust path.
5. **Evidence stays available for audit without living in state.**

None of these is needed to launch. The same verifier crate runs first as a contract on Polkadot Hub, if it fits (`ZMX-033`), and moves to a JAM service when JAM is live.

---

## 7. The Options, Compared Honestly

| | Signed transparency log | Ethereum L1 / rollup | Polkadot Hub contract | **JAM service** |
| :--- | :--- | :--- | :--- | :--- |
| **Key directory nobody can rewrite** | No: detectable, not preventable | Yes | Yes | Yes |
| **Verify TDX quotes** | Off-chain, by witnesses anyone can re-run | Yes, on-chain today | Rust on PVM, to benchmark | Yes, in `Refine` |
| **Verify SEV-SNP reports** | Off-chain, by witnesses | Through a zk proof, or costly natively | Rust on PVM, to benchmark against block limits | Yes, in `Refine` |
| **Client verifies without trusting the server** | Proofs plus a witness quorum | Helios on L1 | Smoldot (contract-storage proofs to confirm) | **Not yet: no light client** |
| **Infrastructure we must run** | Log and witnesses | None | None | A builder |
| **Operator bonds** | Legal contracts only | Yes | Yes, in DOT | Yes, in DOT |
| **Names, personhood, product hosts, distribution** | None | Separate ecosystems | **Same ecosystem** | Same ecosystem |
| **Available now** | Yes | Yes | Yes | **Not on mainnet** |

Reading the table straight: the directory can be built today on several platforms. Polkadot Hub is chosen for the last row but one, not for a capability the others lack.

---

## 8. What ZeroMX Gives Polkadot

This is the case for ecosystem funding. It is written to be checked.

| What Polkadot's strategy asks for | What ZeroMX brings |
| :--- | :--- |
| Products people use, measured in people | A mailbox is opened many times a day. Each paying account is one person or one firm. |
| Privacy for people | Mail sealed before storage, with every trust point published. |
| Use of the product platform | A ZeroMX Product in the Polkadot hosts, `.dot` names as handles, Proof of Personhood for the free tier. |
| Demand for DOT | **Operator bonds in DOT.** **Subscriptions payable in dotUSD**, which is backed by DOT. **Optional stake instead of a subscription**, through a nomination pool. Directory transactions pay Hub fees. |
| A reason for non-crypto people to arrive | Email needs no explanation. The user never has to see a wallet. |
| Reusable public goods | An open-source SEV-SNP and TDX verifier for PVM. A storage adapter and usage data for Levity. A worked example of a non-financial product on the platform. |

**Route to funding.** The Web3 Foundation grants programs are closed. The live routes are an OpenGov treasury referendum and a direct conversation with the Polkadot Community Foundation, which proposed the strategy. A proposal should be milestone-based and each milestone should be something a voter can check:

1. Alpha: relay, storage and Bridge working for invited users, with the directory mirrored to a Polkadot Hub testnet.
2. Product spike: written answers to the open questions in section 9.
3. Beta: directory on Polkadot Hub mainnet, published audit, phone app, payment in dotUSD.
4. Open network: independent operators bonded in DOT.

**What we will not promise in a proposal:** user numbers before the alpha, a JAM date, or anything that depends on a platform piece that has no date.

---

## 9. Open Questions to Verify Before Promising Anything

| Question | Why it matters | Tracked as |
| :--- | :--- | :--- |
| Can a Product hold or derive decryption keys safely inside the host sandbox? | Decides whether the Product can be a full mail client or only onboarding and settings. | `ZMX-037` |
| Can a Product run in the background or receive notifications? | Mail without notifications is not a mail client. | `ZMX-037` |
| Can a third-party app use Proof of Personhood without sending the user through the Polkadot app? | Decides whether the free tier is independent of that app. | `ZMX-037` |
| Does Smoldot prove `pallet-revive` contract storage? | Decides whether clients can drop the two-RPC cross-check. | `ZMX-033` |
| Do the SEV-SNP and TDX chains verify within a contract call's limits on Polkadot Hub? | Decides whether attestation is checked on-chain before JAM. | `ZMX-033` |
| What will Levity's mainnet authorization and capacity model be? | Decides whether the arrival-box adapter is worth shipping. | `ZMX-038` |

---

## 10. Consequences for the Plan

1. **Staged directory.** Signed log in the alpha, contract on Polkadot Hub in the beta, JAM service as the target. Same data model throughout ([02, section 3](02-technical-specification.md)).
2. **One verifier crate.** `no_std` Rust, compiled to native for witnesses, to PVM for a Hub contract, and later for `Refine`.
3. **The JAM light client comes from the ecosystem.** Other teams are building them. ZeroMX adopts one when it can run in an application and makes no RPC-free claim for JAM before that.
4. **Private key lookups** are designed independently of the platform (`ZMX-032`).
5. **Collateral freshness.** A chain cannot fetch from AMD or Intel. Relays submit vendor-signed collateral with each quote, and the verifier checks the vendor signature and the validity window against chain time.
6. **Benchmark before quoting numbers.** No cost or throughput figure goes into a deck or a proposal before `ZMX-033` exists.
7. **Platform independence is tested, not asserted.** The directory adapter has a second implementation (the signed log) that runs in CI.
