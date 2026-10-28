import {parseGroups, planCopies, packingList} from './core.mjs';
import {$, download, renderRows, wireShare} from './share.mjs';
let current;
function update() {
  try {
    if (!$('pages').value.trim()) throw new Error('Enter the page count.');
    current = planCopies(parseGroups($('groups').value), Number($('pages').value));
    $('error').textContent = '';
    $('masters').textContent = current.masters;
    $('local').textContent = current.localCopies;
    $('total').textContent = `${current.readers} copies · ${current.totalPages} page units in either model`;
    $('status').textContent = `Origin dispatch falls from ${current.readers} copies to ${current.masters}: ${current.reduction.toFixed(1)}% fewer copies sent from the origin. Total printing stays the same.`;
    $('comparison').textContent = `Direct distribution: ${current.directPages} page units dispatched. Group distribution: ${current.masterPages} page units dispatched + ${current.localPages} reproduced locally.`;
    renderRows($('rows'), current.rows.map(row => [row.label, row.readers, row.masters, row.localCopies, row.localPages]));
    $('download').disabled = false;
  } catch (error) {
    current = null;
    $('error').textContent = error.message;
    for (const id of ['masters', 'local']) $(id).textContent = '—';
    $('rows').replaceChildren(); $('total').textContent = ''; $('comparison').textContent = '';
    $('status').textContent = 'Correct the input to calculate a plan.'; $('download').disabled = true;
  }
}
for (const id of ['groups', 'pages']) $(id).addEventListener('input', update);
$('example').addEventListener('click', () => { $('groups').value = 'Library | 12\nSchool | 18\nRepair club | 6'; $('pages').value = '4'; update(); });
$('single').addEventListener('click', () => { $('groups').value = 'North desk | 1\nSouth desk | 1'; $('pages').value = '4'; update(); });
$('download').addEventListener('click', () => { if (current) download('copy-distribution-plan.txt', packingList(current)); });
wireShare(); update();
