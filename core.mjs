// A modern recipient-group model, not a reconstruction of the historical list.
export function parseGroups(text) {
  if (typeof text !== 'string' || text.length > 16000) throw new Error('Enter up to 50 recipient groups.');
  const lines = text.trim().split(/\r?\n/);
  if (!text.trim()) throw new Error('Add at least one recipient group.');
  if (lines.length > 50) throw new Error('Use at most 50 recipient groups.');
  return lines.map((line, index) => {
    const parts = line.split('|');
    if (parts.length !== 2) throw new Error(`Line ${index + 1}: use Group name | reader count.`);
    const [label, count] = parts.map(x => x.trim());
    if (!label || label.length > 80 || /[\u0000-\u001f\u007f]/.test(label)) throw new Error(`Line ${index + 1}: use a name of 1–80 characters.`);
    if (!/^\d+$/.test(count) || Number(count) < 1 || Number(count) > 10000) throw new Error(`Line ${index + 1}: readers must be a whole number from 1 to 10,000.`);
    return { label, readers: Number(count) };
  });
}

export function planCopies(groups, pages) {
  if (!Number.isInteger(pages) || pages < 1 || pages > 1000) throw new Error('Pages per copy must be a whole number from 1 to 1,000.');
  if (!Array.isArray(groups) || groups.length < 1 || groups.length > 50) throw new Error('Use 1–50 recipient groups.');
  const rows = groups.map((group, index) => {
    if (!group || typeof group.label !== 'string' || !group.label.trim() || group.label.length > 80 || /[|\u0000-\u001f\u007f]/.test(group.label)) throw new Error('Every group needs a short name without separators or line breaks.');
    if (!Number.isInteger(group.readers) || group.readers < 1 || group.readers > 10000) throw new Error('Readers per group must be a whole number from 1 to 10,000.');
    return { id: index + 1, label: group.label.trim(), readers: group.readers, masters: 1, localCopies: group.readers - 1, localPages: (group.readers - 1) * pages };
  });
  const readers = rows.reduce((sum, row) => sum + row.readers, 0);
  const masters = rows.length;
  return { rows, pages, readers, masters, directPages: readers * pages, masterPages: masters * pages, localCopies: readers - masters, localPages: (readers - masters) * pages, totalPages: readers * pages, reduction: (readers - masters) / readers * 100 };
}

export function packingList(plan) {
  return [
    'COPY DISTRIBUTION PLAN — modern adaptation inspired by RFC 3',
    `Document length: ${plan.pages} page(s). ${plan.readers} readers in ${plan.masters} recipient groups.`,
    'Each reader keeps a copy. Each group retains its master and prints the rest.',
    '',
    ...plan.rows.map(row => `${row.id}. ${row.label}: send 1 master; print ${row.localCopies} locally (${row.localPages} page units); ${row.readers} final copies.`),
    '',
    `Origin dispatch: ${plan.masters} master copies (${plan.masterPages} page units).`,
    `Direct-to-reader comparison: ${plan.readers} copies (${plan.directPages} page units).`,
    `Local reproduction: ${plan.localCopies} copies (${plan.localPages} page units).`,
    `Total: ${plan.readers} copies, ${plan.totalPages} page units in either model.`,
    'Counts exclude extra archive copies, wastage, envelopes and transport. This is not a cost or paper-saving estimate.',
    ''
  ].join('\n');
}
