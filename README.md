# Copy Planner

Plan how many master copies to send and how many copies each group needs to print locally.

**[Open the utility](https://sreenivas-sadhu-prabhakara.github.io/rfc-0003-copy-planner/)** · [Source repository](https://github.com/Sreenivas-Sadhu-Prabhakara/rfc-0003-copy-planner) · [RFC 3](https://www.rfc-editor.org/rfc/rfc3.txt) · [Official metadata](https://www.rfc-editor.org/info/rfc3) · [Errata](https://www.rfc-editor.org/errata/rfc3) · [Successor RFC 10](https://www.rfc-editor.org/rfc/rfc10.txt) · [Later successor RFC 16](https://www.rfc-editor.org/rfc/rfc16.txt)

## Who it helps

Libraries, schools, volunteer organizers and community print workshops. Compare direct distribution to every reader with a modern hub model: one master to each recipient group plus local copies. Produce a per-group packing and reproduction checklist with copy and page counts.

## Run and test

Serve this directory with `python3 -m http.server 8000`, then open http://localhost:8000.
Run `node --test` or `npm test` with Node 22 or newer. No install or build step is needed.
Behavioral tests cover normal outcomes, invalid input, boundary cases and exports.

All processing uses local browser modules with relative URLs. No external fonts,
scripts, runtime dependencies, tracking, uploads or automatic persistence.
The loaded tab continues to calculate and download files offline. Offline reload
is not promised: use a local server to work without a network connection.
Reloading the page resets your inputs; download anything you want to keep.

## Evidence and interpretation

Basis: RFC 3, DISTRIBUTION (a copy to each listed recipient, with local reproduction if wanted); FORM and OTHER NOTES (titles need not uniquely identify notes).

Each entered row is a distinct recipient group, even when labels match. The group reader count includes the person retaining the master. Total reader copies are conserved; only copies and page units dispatched by the origin decrease. Counts are not costs, envelopes, bytes, carbon estimates or proof of delivery. Single-sided page units; no postage or duplex assumption. Strict positive integer limits and bounded totals prevent unusable input.

Every reader gets one copy and one reader keeps each master. Total printing is unchanged; only the copies dispatched by the origin decrease. This model excludes retained archive copies, spoilage, envelopes, cost and transport. It sends nothing and verifies no delivery.

Official status: UNKNOWN · Legacy stream. UNKNOWN is not the formal HISTORIC classification. These educational adaptations are not current Internet standards. RFC 3 is obsoleted by RFC 10. RFC 10 is in turn listed as obsoleted by RFC 16. RFC 10 revises the note conventions and recipient list; RFC 16 adds an MIT recipient. These are historical records, not current contact or submission instructions.

The retrieved errata view lists report 8412 as Reported, not Verified. Its cited section and text do not match the cached RFC, so it is not applied. Follow-up access to the newer endpoint was unavailable; check the linked page for the latest status. The introductory affiliations and distribution list differ. We do not resolve those differences or reuse historical contact details.

Source format: plain text. Full assigned source read and SHA-256 checked before planning.
Source SHA-256: `fc6b8d93a449fe48d21d5519632b79f4d40a08077e134ed2bd529595485040bd`.
Review timestamp: 2026-10-28T23:33:30.593539+00:00.

## Try an example

Try 12 library readers, 18 school readers and 6 club readers with a four-page note. Compare origin dispatch with total printing. Then try one reader per group: does the group model still reduce dispatch?

Expected: The community example sends 3 masters and prints 33 copies locally. Both approaches produce 36 copies, or 144 page units. One reader per group produces no dispatch reduction.

## Publication and contribution

The daily runner tests and publishes this standalone directory to its own public
repository and GitHub Pages site. Canonical and source links use the configured
account. Those links become live after runner publication; this build does not
claim that publication has occurred. Pages serves `main` at `/`; `.nojekyll`
disables Jekyll processing.

`ci/test.yml` is an inactive Actions template. The runner enforces local tests.
The current CLI credential cannot upload `.github/workflows` files; the template
remains under `ci/`.

See [PROMOTION.md](PROMOTION.md) for prepared sharing copy and a teaching exercise.
No outreach is performed. Please report issues with the input, expected behavior,
and supporting RFC section. Original code is MIT licensed. Referenced RFCs retain
their own notices. Independent community project, unaffiliated with the IETF or RFC Editor.
