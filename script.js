let overlay = null;

function openWindow(name) {
  // Close any open window first
  document.querySelectorAll('.window').forEach(w => w.classList.add('hidden'));
  if (overlay) { overlay.remove(); overlay = null; }

  const win = document.getElementById('window-' + name);
  if (!win) return;

  // Create overlay
  overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.onclick = () => closeWindow(name);
  document.body.appendChild(overlay);

  win.classList.remove('hidden');
}

function closeWindow(name) {
  const win = document.getElementById('window-' + name);
  if (win) win.classList.add('hidden');
  if (overlay) { overlay.remove(); overlay = null; }
}

// Double-click to open, single click selects (visual feedback)
document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', () => {
    document.querySelectorAll('.icon').forEach(i => i.classList.remove('selected'));
    icon.classList.add('selected');
  });
});
