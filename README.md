# n8n-nodes-auditsocials

An [n8n](https://n8n.io) community node for the **AuditSocials Compliance API** —
check AI-generated ad and social content against live platform advertising
policy across 8 platforms (Meta, TikTok, Google Ads, YouTube, X, LinkedIn,
Snapchat, Pinterest) **before it publishes**.

Drop the **AuditSocials** node into any workflow to get structured policy-risk
flags — severity, confidence, the matched text, and a fix suggestion — so a
generated post or ad never ships a line that gets it rejected, demonetized or
an account suspended. It's a risk-flagging step, not a guarantee.

## Installation

**n8n Cloud / Desktop:** Settings → Community Nodes → Install →
`n8n-nodes-auditsocials`.

**Self-hosted:** from your n8n root, `npm install n8n-nodes-auditsocials`, then
restart n8n.

## Credentials

Create an **AuditSocials API** credential and paste your key. Get a free key at
[auditsocials.com/compliance-api](https://www.auditsocials.com/compliance-api)
— 50 checks/month, no card.

## Operation

**Check Content Compliance** — `POST /api/v1/compliance-check`

| Field | Description |
| --- | --- |
| Content | The ad or social copy to screen |
| Platforms | Which platform policies to check against (Meta, TikTok, Google Ads, YouTube, X, LinkedIn, Snapchat, Pinterest) |
| Content Type | post · caption · ad · video-script |
| Sector | Optional industry for sharper checks (finance, health, …) |

Returns `verdict` (`compliant` / `needs_changes`), a `findings[]` array
(each with `severity`, `confidence`, `matchedText`, `suggestion`), and your
`credits` balance.

### Example flow

```
Generate content → AuditSocials (Check) → IF verdict = needs_changes
                                             ├─ true  → rewrite → re-check
                                             └─ false → publish / approve
```

Ready-made workflows using this pattern: https://www.auditsocials.com/templates

## Pricing

Free 50/mo · Starter $99/5,000 · Growth $299/25,000 — one credit per check.

## License

[MIT](https://opensource.org/licenses/MIT)
