# Customer Support Assistant Architecture

## Components

The browser uses Agora RTC for audio and RTM for transcript and Agent events. Next.js only signs credentials and starts/stops the managed Agent. No business session, data API, local file store or persistent application database is required. Native Node.js, Docker and a Next.js-compatible serverless deployment use the same conversation flow. Actual hosted voice acceptance remains a separate check.

## Session time limit

LandingPage enforces a ten-minute browser session deadline from successful startup. It reuses the manual stop flow, checks wall time every second and on focus/visibility changes, and retries failed stops every five seconds. Successful stop retains the transcript and shows a timeout notice; starting again resets the deadline. Effect cleanup removes the timer/listeners. This is not a server-side usage cap: closed pages, suspended devices and network failures can delay Agent shutdown.

The conversation header shows a small, muted countdown (10:00 left) immediately before the connection status. The last minute is highlighted, with an automatic-stop notice for screen readers. At the deadline the timer stays at 00:00 until stopping succeeds. Screen readers do not announce every tick.

## Start and stop

The page requests an RTC/RTM token and starts the managed Agent using requester_id and channel_name. RTM is ready before the RTC conversation component mounts. End conversation stops the Agent, logs out RTM and unmounts hook-owned media. No customer, shopping, follow-up or event session participates in startup.

## State

Scenario instructions and general support guidance are bundled with the app. No brand or product is preselected; the caller supplies the product, service and issue. The reference does not define company policies or individual eligibility. Current-call transcript, activity and Inspector state live in browser memory. There is no business Map, writable result file, business API or application database.

## Ownership and invariants

LandingPage owns bootstrap and RTM. ConversationComponent owns RTC/toolkit subscriptions and uses the StrictMode guard. Preserve local-user UID normalization and interrupted turns. Token, invite and stop routes own privileged operations. lib/agent-tools.ts always returns an empty list.

## Deployment

The browser uses Agora RTC for audio and RTM for transcript and Agent events. Next.js only signs credentials and starts/stops the managed Agent. No business session, data API, local file store or persistent application database is required. Native Node.js, Docker and a Next.js-compatible serverless deployment use the same conversation flow. Actual hosted voice acceptance remains a separate check.

Supply NEXT_PUBLIC_AGORA_APP_ID at build and runtime and keep NEXT_AGORA_APP_CERTIFICATE server-only. No persistent volume is required. Synthetic verification does not prove real speech or hosted reachability.

## Usage FAQ ownership

`components/ScenarioFaq.tsx` owns static usage answers; `styles/faq.css` owns disclosure styling, scrolling and transitions. Its header trigger and content share a Radix Dialog root in `LandingPage`. Dialog handles focus trapping, Escape/backdrop dismissal and returning focus to the trigger. FAQ has no session or business API calls.

## Conversation behavior

### What the assistant helps with

Help with product or service use, troubleshooting, missing or damaged items, returns, refunds, warranty, delivery, billing and account questions. Follow the caller's actual goal and ask for the product or service only when needed to give useful guidance.

For a fault, use the reported symptom and checks already completed. Offer one safe, reversible check at a time and ask about its result before moving on. Keep observations separate from diagnoses and avoid invented product-specific instructions. If a safety concern is reported, stop powered checks, advise stopping use and disconnecting only if safe, and explain the need for qualified inspection.

For missing or damaged items, compare the caller's expected and received contents without inventing a complete package list. Help explain the discrepancy to the seller rather than starting unrelated troubleshooting.

For returns, refunds, warranty and compatibility, explain general steps and interpret policies or specifications as caller-reported information. Identify the actual policy or documentation needed for an exact answer; do not invent eligibility, windows, fees or timing.

For order, delivery, billing and account concerns, help interpret the status or message the caller reports and explain the relevant official next step. Do not claim a lookup or collect identifiers for one.

Honor a request for human support and offer a verbal recap of the issue, relevant details, checks and results, unresolved question and next step. No live transfer or support submission is available.

### Reference material and date context

General support guidance, explicitly separate from product manuals, company policies and live business records. No fictional brand or fixed product catalog defines the conversation.

`lib/scenario-knowledge.ts` supplies the public material. `lib/prompt-context.ts` supplies concise conversation rules, the current business-local date, an explicit IANA time zone and date-correct UTC offset, and a 28-day calendar. Dates in that calendar are not availability. Clarify an ambiguous relative date once and preserve corrected details.

### Capability boundary

No order, account, warranty, payment or shipment records are connected. Do not infer eligibility or promise a refund, repair price, warranty period, replacement or delivery. Never recommend unsafe checks, opening powered equipment, bypassing safety features, undocumented resets or deleting account data. Do not collect credentials, verification codes, payment details or unnecessary personal identifiers. Do not create a ticket, return, refund, shipment, account change, callback or live transfer. Keep general guidance and caller-reported information distinct from confirmed company facts.

## Token lifetime compatibility

Browser RTC/RTM tokens and server-side Agent/REST tokens use the shared ten-minute `TOKEN_LIFETIME_SECONDS` duration. Token builders take durations, not Unix expiry timestamps. Keep the App Certificate and ConvoAI-capable REST tokens on the server.

The Agent start/stop routes explicitly mint tokens with `ConvoAITokenBuilder.buildToken` and pass the supported SDK `authToken` / session `token` options. This avoids the `agora-agents` 2.14.0 / `agora-token` 2.0.7 positional-argument mismatch: the SDK helper otherwise treats publisher role `1` as a one-second token lifetime. Do not patch installed dependencies or add blanket overrides. `verify:api` exercises the real SDK serialization with intercepted network transport, decodes and verifies actual signed tokens, and checks a 600-second lifetime for browser, REST start, Agent RTC/RTM and REST stop tokens. Revisit the explicit-token compatibility path only after an upstream SDK correction passes this regression and live acceptance.

## Lint dependency security compatibility

The registry audit reports GHSA-g3hv-75wg-m249 in minimatch 10.2.6, including the latest typescript-estree 8.72.2 dependency range. A parent-scoped pnpm override selects minimatch 11.0.1 only for `@typescript-eslint/typescript-estree>minimatch`; it does not replace unrelated consumers. Node.js 24 satisfies its runtime requirement, and the caller uses the retained CommonJS `minimatch` function with `dot: true`. Recheck and remove this compatibility override when the upstream dependency range includes a patched version. Run the complete verification suite and an official-registry audit after lockfile updates.
