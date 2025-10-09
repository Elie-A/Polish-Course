/*
 * common.js - Shared utilities for Polish Course site
 * Provides: DOM helpers, modal manager, scrolling highlight, fadeIn, storage, pagination, file JSON loader.
 * All exposed under window.PolishApp to avoid global clutter.
 */
(function (window, document) {
	const PolishApp = window.PolishApp || {};

	// ---------------- DOM Helpers ----------------
	function onReady(fn) {
		if (document.readyState !== 'loading') fn();
		else document.addEventListener('DOMContentLoaded', fn);
	}
	const qs = (sel, ctx = document) => ctx.querySelector(sel);
	const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
	const addEvent = (el, ev, fn) => el && el.addEventListener(ev, fn, false);
	function delegate(parent, selector, event, handler) {
		addEvent(parent, event, (e) => {
			const target = e.target.closest(selector);
			if (target && parent.contains(target)) handler(e, target);
		});
	}

	// ---------------- Modal Manager ----------------
	const Modal = {
		open(ref) {
			const el = typeof ref === 'string' ? document.getElementById(ref) : ref;
			if (el) el.classList.add('show');
		},
		close(ref) {
			const el = typeof ref === 'string' ? document.getElementById(ref) : ref;
			if (el) el.classList.remove('show');
		},
		bindCards(selectors) {
			selectors.forEach((sel) =>
				qsa(sel).forEach((card) => {
					addEvent(card, 'click', () => {
						const id = card.getAttribute('data-modal');
						if (id) Modal.open(id);
					});
				})
			);
		},
		bindDismiss() {
			// X button inside modal
			qsa('.close').forEach((btn) =>
				addEvent(btn, 'click', () => {
					const m = btn.closest('.modal');
						if (m) Modal.close(m);
				})
			);
			// click outside modal content
			addEvent(window, 'click', (e) => {
				if (e.target.classList && e.target.classList.contains('modal')) Modal.close(e.target);
			});
			// ESC key closes all
			addEvent(window, 'keydown', (e) => {
				if (e.key === 'Escape') qsa('.modal.show').forEach((m) => Modal.close(m));
			});
		},
	};

	// ---------------- Alert Modal (popup.css) ----------------
	function showModal(message, options) {
		const modal = document.getElementById('modal');
		if (!modal) {
			console.warn('showModal: #modal not found');
			return;
		}
		const opts = typeof options === 'number' ? { autoClose: options } : (options || {});
		const { autoClose = 0, focus = '#modal-ok' } = opts;
		const modalMessage = document.getElementById('modal-message');
		if (modalMessage) modalMessage.textContent = message;
		modal.style.display = 'flex';
		const closeBtn = document.getElementById('modal-close');
		const okBtn = document.getElementById('modal-ok');
		const closeModal = () => {
			modal.style.display = 'none';
			closeBtn && closeBtn.removeEventListener('click', closeModal);
			okBtn && okBtn.removeEventListener('click', closeModal);
			window.removeEventListener('keydown', escListener);
		};
		const escListener = (e) => { if (e.key === 'Escape') closeModal(); };
		closeBtn && closeBtn.addEventListener('click', closeModal);
		okBtn && okBtn.addEventListener('click', closeModal);
		window.addEventListener('keydown', escListener);
		// optional focus
		if (focus) {
			const focusEl = typeof focus === 'string' ? document.querySelector(focus) : focus;
			focusEl && setTimeout(() => focusEl.focus(), 30);
		}
		if (autoClose > 0) setTimeout(() => closeModal(), autoClose);
	}

	// ---------------- Visual Utilities ----------------
	function smoothScrollHighlight(el, highlightClass = 'highlight', duration = 1500) {
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth' });
		el.classList.add(highlightClass);
		setTimeout(() => el.classList.remove(highlightClass), duration);
	}

	function fadeIn(el, duration = 500) {
		if (!el) return;
		let opacity = 0;
		el.style.opacity = 0;
		const interval = 20;
		const inc = interval / duration;
		const id = setInterval(() => {
			opacity += inc;
			if (opacity >= 1) {
				opacity = 1;
				clearInterval(id);
			}
			el.style.opacity = opacity;
		}, interval);
	}

	// ---------------- Storage Helpers ----------------
	function getJSON(key, def = null) {
		try {
			const raw = localStorage.getItem(key);
			return raw ? JSON.parse(raw) : def;
		} catch (e) {
			return def;
		}
	}
	function setJSON(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (e) {
			console.warn('setJSON failed', e);
		}
	}

	// ---------------- Pagination Helper ----------------
	function paginate(data, page, size) {
		const totalPages = Math.ceil(data.length / size) || 1;
		const safePage = Math.min(Math.max(1, page), totalPages);
		const start = (safePage - 1) * size;
		return { slice: data.slice(start, start + size), totalPages, page: safePage };
	}

	// ---------------- JSON File Loader ----------------
	function loadJSONFile(file, validateFn, successFn, errorFn) {
		if (!file) {
			errorFn && errorFn('No file selected');
			return;
		}
		if (!file.name.endsWith('.json')) {
			errorFn && errorFn('Please select a JSON file.');
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = JSON.parse(e.target.result);
				if (validateFn && !validateFn(data)) throw new Error('Invalid JSON structure.');
				successFn && successFn(data);
			} catch (err) {
				errorFn && errorFn(err.message);
			}
		};
		reader.readAsText(file);
	}

	// ---------------- Expose ----------------
	PolishApp.dom = { onReady, qs, qsa, addEvent, delegate };
	PolishApp.modal = Modal;
	PolishApp.showModal = showModal; // legacy global
	PolishApp.effects = { smoothScrollHighlight, fadeIn };
	PolishApp.storage = { getJSON, setJSON };
	PolishApp.paginate = paginate;
	PolishApp.loadJSONFile = loadJSONFile;

	window.PolishApp = PolishApp;
})(window, document);
