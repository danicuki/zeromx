# 08 — Why Polkadot JAM, and What It Does Not Give Us Yet

**Position:** JAM is the best long-term home for the ZeroMX control plane. It is not the only way to build ZeroMX, and one of the most common arguments for it, a trustless light client in the browser, is not true yet. People in the Polkadot and JAM ecosystem will check every claim below. The pitch has to survive that.

The line to use in the deck and on the website: **"JAM is where this belongs"**, not "only JAM makes this possible".

---

## 1. What the Control Plane Actually Has to Do

| Job | Detail | Volume |
| :--- | :--- | :--- |
| Verify relay attestation | **AMD SEV-SNP:** report signed with ECDSA P-384 / SHA-384, under an RSA-4096-PSS vendor chain. **Intel TDX:** quote and PCK chain signed with ECDSA **P-256**; measurements are SHA-384. Plus vendor collateral (TCB info, revocation lists). | Per relay, per epoch |
| Keep the key directory | Append-only log of user key records. | Rare writes |
| Keep the operator registry and measurement allowlist | Small state. | Rare writes |
| Be verifiable from a browser extension | The client must not have to believe whoever serves the data. | Every send |
| Hold operator bonds | And later verify batched rate-limit proofs. | Per epoch |

No email and no per-email data touches the chain. The on-chain workload is small, which means **chain cost is not the bottleneck on any platform.** Arguments that rest on per-user chain cost are weak arguments.

---

## 2. Review of the "Only JAM" Argument

The argument circulating for this project made eleven checkable claims. Verdicts:

| # | Claim | Verdict | What is actually true |
| :- | :--- | :--- | :--- |
| 1 | On-chain attestation proves a relay operator did not read RAM. | **False** | Attestation shows which code booted on genuine silicon. An operator with physical access can read memory or extract attestation keys. See [07, section 4](07-threat-model-and-limits.md). |
| 2 | SEV-SNP and TDX rely on P-384 and RSA-4096. | **Half right** | True for SEV-SNP. TDX quotes use ECDSA P-256. |
| 3 | The EVM has no precompiles for this, verification costs tens of millions of gas, and projects are forced onto centralized off-chain provers. | **Overstated** | The EVM has a P-256 precompile (EIP-7951 on Ethereum L1 since the Fusaka upgrade, RIP-7212 on rollups before that) and a modular-exponentiation precompile that makes RSA practical. Intel SGX/TDX quotes are verified fully on-chain today for roughly 3 to 4 million gas, or about 300 thousand gas through a zkVM proof. P-384 and SHA-384 have no precompile, so SEV-SNP is expensive natively and usually goes the proof route. A proof is checked on-chain, so the prover is not trusted. The real costs are minutes of proving latency and a liveness dependency. |
| 4 | `Refine` gives seconds of near-native RISC-V execution, so ordinary `no_std` Rust crates verify raw quotes directly. | **Sound, unbenchmarked** | This is the real technical advantage. "Thousands of proofs per work package" is a number nobody has measured. |
| 5 | Megabytes of transient evidence in, a few bytes of state out. Only JAM handles that asymmetry. | **Partly** | Refine/Accumulate fits the shape well. Ethereum blobs also carry transient data, though contracts cannot read them directly. And ZeroMX does not have megabytes per user. The work-package bound is about 12 to 13.8 MB depending on Gray Paper version, not "about 15 MB". |
| 6 | Smoldot gives a JAM service a trustless light client inside a browser extension. | **False today** | Smoldot is a Substrate light client. JAM has no light client, and JAM's own node-RPC documentation says so. Smoldot does work today for the Polkadot relay chain and parachains, including Polkadot Hub. |
| 7 | Ethereum and Solana have no browser light client, so extensions must trust an RPC provider. | **False for Ethereum L1** | Helios is an Ethereum light client that compiles to WebAssembly and verifies an untrusted RPC. Its OP Stack mode trusts the sequencer's signature. Roughly true for Solana. |
| 8 | A P2P light client stops the network learning who emails whom. | **False as stated** | Any client that asks a remote node for one specific key reveals that lookup to the node, whether the node is an RPC provider or a P2P peer. Lookup privacy needs its own design (section 5). |
| 9 | A JAM service needs no collators, deploys permissionlessly, and scales across cores. | **True in design, with a footnote** | Someone still runs a builder that assembles work packages and buys coretime. Polkadot already offers on-demand coretime, and PVM smart contracts on Polkadot Hub have been on mainnet since early 2026, also with no chain to run. |
| 10 | Staking yield makes the product free forever. | **False** | See [03, Model B](03-business-model.md). |
| 11 | Chain cost per user: dollars on an L2, under two cents on JAM. | **Unsupported** | JAM mainnet coretime has no price yet, and our on-chain work is per relay per epoch, which is cheap anywhere. |

Two items in this table rest on memory rather than a source checked for this document and should be confirmed before they are repeated publicly: Solana's P-256 precompile status, and the exact `Refine` gas limit in the current Gray Paper.

---

## 3. What JAM Genuinely Adds

1. **An execution model shaped like this workload.** Heavy, stateless verification runs in-core in `Refine`. Only the result reaches chain state in `Accumulate`. Attestation evidence, vendor collateral and proof batches are exactly that kind of input.
2. **No dependency on precompiles.** Verification is ordinary Rust compiled to PVM. P-384, RSA-PSS, SHA-384, a future P-384 TDX variant, post-quantum signatures, or a new proof system need no protocol upgrade and no proving service. Hardware vendors change formats. We do not want the control plane's roadmap tied to another chain's precompile politics.
3. **A service, not a chain.** No validator set or collator set to bootstrap and secure. Coretime is bought as needed.
4. **One security domain.** The key directory, operator bonds, and later slashing sit under Polkadot's validators and settle in DOT, with no bridge in the trust path.
5. **Evidence stays available for audit without living in state.** Work packages are available to auditors for the audit period and are then dropped.
6. **Ecosystem fit.** ZeroMX is a non-financial, verification-heavy service, which is the kind of workload JAM was designed to host and that the ecosystem wants to demonstrate. The team builds JAM itself.

---

## 4. The Options, Compared Honestly

| | Witnessed transparency log | Ethereum L1 / rollup | Polkadot Hub PVM contract | Parachain | **JAM service** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Verify TDX quotes** | Off-chain, by witnesses anyone can re-run | Yes, on-chain today | Rust on PVM, to benchmark | Yes | Yes, in `Refine` |
| **Verify SEV-SNP reports** | Off-chain, by witnesses | Through a zk proof, or costly natively | Rust on PVM, to benchmark against block limits | Yes | Yes, in `Refine` |
| **Browser verifies without trusting the server** | Proofs plus a witness quorum | Helios on L1 | Smoldot today (contract-storage proofs to confirm) | Smoldot today | **Not yet: no light client** |
| **Infrastructure we must run** | Log and witnesses | None | None | Collators, coretime | A builder |
| **Operator bonds** | Legal contracts only | Yes | Yes, in DOT | Yes, in DOT | Yes, in DOT |
| **Available now** | Yes | Yes | Yes, recently | Yes | **Not on mainnet** |

Reading the table straight: everything ZeroMX needs can be built today without JAM, and the two rows where JAM is behind are the two that matter most at launch.

---

## 5. Consequences for the Plan

1. **Staged control plane.** Witnessed transparency log first. JAM service as the target. This is unchanged from [04](04-roadmap.md).
2. **A possible bridge step: the same verifier as a PVM contract on Polkadot Hub.** The attestation verifier is one `no_std` Rust crate. Compiled to PVM it can run as a contract on Polkadot Hub now and as a JAM service later, with the same code. Hub state is provable through Smoldot today, which would give RPC-free verification in the browser on Polkadot *before* a JAM light client exists. Take this step only if two checks pass: the P-384 plus RSA-4096 chain verifies within a contract call's limits, and Smoldot can prove the contract storage the client needs. Tracked as `ZMX-033`.
3. **The JAM light client comes from the ecosystem.** Other teams are building JAM light clients, so ZeroMX does not take this on. We track their progress and adopt one when it can run in a browser extension. Until then the product makes no RPC-free claim for JAM.
4. **Private key lookups.** The client must not ask a node for one recipient's key. Options, in order of cost: sync compact directory snapshots, fetch by hash-prefix bucket so each lookup hides among many, route lookups through an oblivious relay, and later private information retrieval. Tracked as `ZMX-032`.
5. **Collateral freshness.** A chain cannot fetch from AMD or Intel. Relays submit vendor-signed collateral with each quote, and the verifier checks the vendor signature and the validity window against chain time. Stale collateral is rejected.
6. **Benchmark before quoting numbers.** PVM instruction counts for one SEV-SNP chain, one TDX quote, and a rate-limit proof batch. No cost or throughput figure goes into a deck before this exists.
