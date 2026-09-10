import './style.css'
import {
  ICON, SCR, CATEGORIES, DEMOS,
  featuredDemos, listedDemos, getDemoById,
  countListed, countAvailableLinks, countByCategory, countByTile, categoryLabel
} from './data.js'

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function hasLink(d) {
  return d.linkState === 'available' && d.url && /^https:\/\//i.test(d.url)
}

function badgeHtml(d) {
  if (hasLink(d)) return '<span class="badge badge-go">体験版あり</span>'
  return '<span class="badge badge-prep">紹介のみ</span>'
}

/* ---------- header counts & tiles ---------- */
document.getElementById('countListed').textContent = String(countListed())
var linksN = countAvailableLinks()
var linksEl = document.getElementById('countLinks')
linksEl.textContent = '体験リンク ' + linksN + '件'

var TILES = [
  { id:'construction', label:'建設', icon:'<path d="M3 14a9 9 0 0 1 18 0"/><path d="M2 14h20v3H2z"/><path d="M12 5v9"/><path d="M9 5.6 12 5l3 .6"/>' },
  { id:'factory', label:'製造', icon:'<path d="M3 20V10l5 3V10l5 3V10l5 3v7z"/><path d="M3 20h18"/><path d="M6 6V4"/>' },
  { id:'care', label:'介護保育', icon:'<path d="M12 20s-7-4.4-7-9.2A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.8C19 15.6 12 20 12 20z"/>' },
  { id:'gov', label:'自治体', icon:'<path d="M4 20h16"/><path d="M6 20V9l6-4 6 4v11"/><path d="M10 20v-5h4v5"/>' }
]

document.getElementById('tiles').innerHTML = TILES.map(function (t) {
  return '<button type="button" class="tile" data-tile="' + t.id + '">'
    + '<div class="head"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + t.icon + '</svg>'
    + '<em class="dot">' + countByTile(t.id) + '</em></div>'
    + '<div class="lb">' + esc(t.label) + '</div></button>'
}).join('')

document.getElementById('moreAllCc').textContent = '掲載 ' + countListed() + '件'

/* ---------- featured cards ---------- */
var cardsBox = document.getElementById('cards')
var featured = featuredDemos()
cardsBox.innerHTML = featured.map(function (d, i) {
  var shotKey = d.shots && d.shots[0] ? d.shots[0][0] : 'card'
  return '<button type="button" class="card ' + esc(d.cls) + '" data-id="' + esc(d.id) + '" style="--i:' + i + '">'
    + '<div class="dim"></div>'
    + '<div class="mock"><div class="body scr">' + (SCR[shotKey] || SCR.card) + '</div></div>'
    + '<div class="eyebrow"><span class="chip">' + (ICON[d.icon] || ICON.doc) + '</span>' + esc(categoryLabel(d.category)) + '</div>'
    + '<h2>' + d.title + '</h2>'
    + '<p class="lead">' + esc(d.lead) + '</p>'
    + '<span class="cta">くわしく見る</span></button>'
}).join('')

/* ---------- category tab list ---------- */
document.getElementById('catList').innerHTML = CATEGORIES.map(function (c) {
  return '<button type="button" class="item rv" data-cat="' + esc(c.id) + '">'
    + '<span class="th" style="background:' + esc(c.bg) + '"></span>'
    + '<span><span class="tt">' + esc(c.label) + '</span><span class="cc">' + esc(c.desc) + '</span></span>'
    + '<span class="go">' + countByCategory(c.id) + '</span></button>'
}).join('')

/* ---------- state ---------- */
var state = {
  view: 'v-works',
  category: null, // CATEGORIES.id or null (=すべて)
  query: '',
  demoId: null
}
var lastFocus = null

function syncUrl(replace) {
  var params = new URLSearchParams()
  if (state.demoId) params.set('demo', state.demoId)
  else {
    if (state.view === 'v-all') {
      params.set('view', 'all')
      if (state.category) params.set('cat', state.category)
      if (state.query) params.set('q', state.query)
    } else if (state.view === 'v-cat') params.set('view', 'cat')
    else if (state.view === 'v-how') params.set('view', 'how')
    else if (state.view === 'v-me') params.set('view', 'me')
  }
  var qs = params.toString()
  var url = qs ? (location.pathname + '?' + qs) : location.pathname
  var hist = { view: state.view, category: state.category, query: state.query, demoId: state.demoId }
  if (replace) history.replaceState(hist, '', url)
  else history.pushState(hist, '', url)
}

function setTabHighlight(viewId) {
  document.querySelectorAll('.tab').forEach(function (t) {
    t.classList.toggle('on', t.dataset.view === viewId)
  })
}

function showView(viewId, opts) {
  opts = opts || {}
  state.view = viewId
  document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('on') })
  var el = document.getElementById(viewId)
  if (el) el.classList.add('on')
  // tab highlight: v-all uses つくったもの tab visually? Plan says 業種 goes to v-all.
  // Keep bottom tabs for works/cat/how/me. v-all is under works flow — highlight works when on all.
  if (viewId === 'v-all') setTabHighlight('v-works')
  else setTabHighlight(viewId)
  if (!opts.keepScroll) window.scrollTo(0, 0)
  watch(el || document)
  if (viewId === 'v-all') renderAllList()
  if (!opts.skipUrl) syncUrl(!!opts.replace)
  if (!reduce) requestAnimationFrame(onScroll)
}

function setCategory(catId, opts) {
  opts = opts || {}
  state.category = catId || null
  state.query = opts.clearQuery ? '' : state.query
  var qInput = document.getElementById('q')
  if (opts.clearQuery && qInput) qInput.value = ''
  updateTileHighlight()
  updateFilterBar()
  showView('v-all', { replace: opts.replace, skipUrl: opts.skipUrl })
}

function updateTileHighlight() {
  document.querySelectorAll('.tile').forEach(function (tile) {
    var on = state.category && (
      tile.dataset.tile === state.category ||
      (CATEGORIES.find(function (c) { return c.id === state.category && c.tile === tile.dataset.tile }))
    )
    // Also: if filtering by fine cat that maps to tile
    var cat = CATEGORIES.find(function (c) { return c.id === state.category })
    if (cat && cat.tile) on = tile.dataset.tile === cat.tile
    else if (TILES.some(function (t) { return t.id === state.category })) on = tile.dataset.tile === state.category
    else on = false
    tile.classList.toggle('on', !!on)
  })
}

function updateFilterBar() {
  var bar = document.getElementById('filterBar')
  var label = document.getElementById('allLabel')
  if (!state.category && !state.query) {
    bar.innerHTML = ''
    label.textContent = 'すべてのデモ（' + countListed() + '）'
    return
  }
  var parts = []
  if (state.category) {
    parts.push('<button type="button" class="chip-filter" data-clear="cat">' + esc(categoryLabel(state.category)) + ' ×</button>')
  }
  if (state.query) {
    parts.push('<button type="button" class="chip-filter" data-clear="q">「' + esc(state.query) + '」×</button>')
  }
  parts.push('<button type="button" class="chip-filter chip-clear" data-clear="all">すべて解除</button>')
  bar.innerHTML = parts.join('')
  label.textContent = '絞り込み結果'
}

function matchesFilter(d) {
  if (state.category) {
    var tileMatch = TILES.some(function (t) { return t.id === state.category })
    if (tileMatch) {
      if (d.tile !== state.category) return false
    } else if (d.category !== state.category) return false
  }
  if (state.query) {
    var q = state.query.toLowerCase()
    var hay = [d.plain, d.lead, d.one, d.audience, categoryLabel(d.category)].concat(d.tags || []).join(' ').toLowerCase()
    if (hay.indexOf(q) === -1) return false
  }
  return true
}

function renderAllList() {
  var list = listedDemos().filter(matchesFilter)
  var box = document.getElementById('allList')
  var empty = document.getElementById('allEmpty')
  if (!list.length) {
    box.innerHTML = ''
    empty.classList.remove('hide')
    return
  }
  empty.classList.add('hide')
  box.innerHTML = list.map(function (d) {
    var cat = CATEGORIES.find(function (c) { return c.id === d.category })
    var bg = cat ? cat.bg : '#241d33'
    return '<button type="button" class="item rv" data-id="' + esc(d.id) + '">'
      + '<span class="th" style="background:' + esc(bg) + '">' + (ICON[d.icon] || ICON.doc) + '</span>'
      + '<span class="item-body"><span class="tt">' + esc(d.plain) + '</span>'
      + '<span class="cc">' + esc(categoryLabel(d.category)) + ' · ' + esc(d.audience || '') + '</span>'
      + '<span class="item-badges">' + badgeHtml(d) + '</span></span>'
      + '<span class="go">›</span></button>'
  }).join('')
  watch(box)
}

/* ---------- detail ---------- */
var detail = document.getElementById('detail')
var dIn = document.getElementById('dIn')

function openCta(d) {
  if (hasLink(d)) {
    return '<a class="go" href="' + esc(d.url) + '" target="_blank" rel="noopener">体験版を開く</a>'
      + '<div class="note">' + esc(d.experienceNote || '別のページが開きます。') + '</div>'
  }
  return '<span class="go is-off" aria-disabled="true">体験版を開く</span>'
    + '<div class="note">' + esc(d.experienceNote || '体験URLを準備しています。') + '</div>'
}

function buildDetail(d) {
  var meta = []
  meta.push({ k:'業種', v: categoryLabel(d.category).split('・')[0], s: categoryLabel(d.category) })
  if (d.audience) meta.push({ k:'使う人', v: d.audience.split('と')[0].split('・')[0], s: d.audience })
  meta.push({ k:'状態', v: hasLink(d) ? '体験可' : '紹介のみ', s: hasLink(d) ? 'リンクあり' : 'URL準備中' })

  var shotKey = d.shots && d.shots[0] ? d.shots[0][0] : 'card'
  var shotsHtml = (d.shots || []).map(function (s) {
    return '<div class="shot"><div class="scr">' + (SCR[s[0]] || SCR.card) + '</div><div class="cap">' + esc(s[1]) + '</div></div>'
  }).join('')

  var canHtml = (d.can || []).map(function (c) { return '<div>' + esc(c) + '</div>' }).join('')
  var plannedHtml = (d.planned || []).map(function (c) { return '<div>' + esc(c) + '</div>' }).join('')

  var related = (d.relatedIds || [])
    .map(getDemoById)
    .filter(Boolean)
    .slice(0, 4)

  return ''
    + '<div class="d-hero ' + esc(d.cls) + '">'
    +   '<button type="button" class="back" id="dBack" aria-label="紹介を閉じる"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>'
    +   '<div class="art"><div class="body scr" style="background:#0d0a15;border:1px solid rgba(255,255,255,.2);border-radius:20px;padding:11px 10px;box-shadow:0 26px 52px rgba(0,0,0,.55)">' + (SCR[shotKey] || SCR.card) + '</div></div>'
    + '</div>'
    + '<div class="d-head">'
    +   '<div class="d-icon ' + esc(d.cls) + '">' + (ICON[d.icon] || ICON.doc) + '</div>'
    +   '<div><h1 id="detailTitle">' + esc(d.plain) + '</h1><div class="one">' + esc(d.one) + '</div>'
    +   '<div class="d-badges">' + badgeHtml(d) + '</div></div>'
    + '</div>'
    + '<div class="d-open">' + openCta(d) + '</div>'
    + '<div class="strip">' + meta.map(function (m) {
        return '<div class="cel"><div class="k">' + esc(m.k) + '</div><div class="v">' + esc(m.v) + '</div><div class="s">' + esc(m.s || '') + '</div></div>'
      }).join('') + '</div>'
    + (shotsHtml ? '<div class="shots">' + shotsHtml + '</div>' : '')
    + (d.when ? '<div class="d-sec"><h3>どんなときに使うか</h3><p>' + esc(d.when) + '</p></div>' : '')
    + (canHtml ? '<div class="d-sec"><h3>この体験版でできること</h3><div class="bul">' + canHtml + '</div></div>' : '')
    + (plannedHtml ? '<div class="d-sec"><h3>今後追加すること</h3><div class="bul bul-muted">' + plannedHtml + '</div></div>' : '')
    + (related.length ? '<div class="d-sec"><h3>関連するデモ</h3></div><div class="shots" style="margin-top:12px">' + related.map(function (x) {
        return '<button type="button" class="shot ' + esc(x.cls) + '" data-goto="' + esc(x.id) + '" style="width:150px;min-height:132px;text-align:left;border:none">'
          + '<div style="width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.2);display:grid;place-items:center">' + (ICON[x.icon] || ICON.doc) + '</div>'
          + '<div style="font-size:13px;font-weight:700;line-height:1.5;margin-top:10px">' + esc(x.plain) + '</div></button>'
      }).join('') + '</div>' : '')
}

function openDetail(id, opts) {
  opts = opts || {}
  var d = getDemoById(id)
  if (!d || d.listed === false) {
    state.demoId = null
    showView('v-all', { replace: true })
    return
  }
  lastFocus = document.activeElement
  state.demoId = id
  dIn.innerHTML = buildDetail(d)
  detail.scrollTop = 0
  detail.classList.add('open')
  document.body.classList.add('lock')
  var back = document.getElementById('dBack')
  if (back) back.focus()
  if (!opts.skipUrl) syncUrl(!!opts.replace)
}

function closeDetail(opts) {
  opts = opts || {}
  detail.classList.remove('open')
  document.body.classList.remove('lock')
  state.demoId = null
  if (!opts.skipUrl) syncUrl(!!opts.replace)
  if (lastFocus && lastFocus.focus) {
    try { lastFocus.focus() } catch (e) {}
  }
  lastFocus = null
}

/* ---------- events ---------- */
document.getElementById('openAll').addEventListener('click', function () {
  state.category = null
  state.query = ''
  var qInput = document.getElementById('q')
  if (qInput) qInput.value = ''
  updateTileHighlight()
  updateFilterBar()
  showView('v-all')
})

document.addEventListener('click', function (e) {
  var tile = e.target.closest('.tile')
  if (tile) {
    var tid = tile.dataset.tile
    if (state.category === tid && state.view === 'v-all') setCategory(null)
    else setCategory(tid)
    return
  }

  var catBtn = e.target.closest('#catList [data-cat]')
  if (catBtn) {
    setCategory(catBtn.dataset.cat)
    return
  }

  var clear = e.target.closest('[data-clear]')
  if (clear) {
    var kind = clear.dataset.clear
    if (kind === 'cat') state.category = null
    else if (kind === 'q') {
      state.query = ''
      document.getElementById('q').value = ''
    } else {
      state.category = null
      state.query = ''
      document.getElementById('q').value = ''
    }
    updateTileHighlight()
    updateFilterBar()
    renderAllList()
    syncUrl(true)
    return
  }

  var card = e.target.closest('.card[data-id]')
  if (card) { openDetail(card.dataset.id); return }

  var item = e.target.closest('#allList [data-id]')
  if (item) { openDetail(item.dataset.id); return }

  var goto = e.target.closest('[data-goto]')
  if (goto) { openDetail(goto.dataset.goto); return }

  if (e.target.closest('#dBack')) {
    history.back()
  }
})

document.getElementById('q').addEventListener('input', function (e) {
  state.query = e.target.value.trim()
  if (state.view !== 'v-all') showView('v-all', { skipUrl: true, keepScroll: true })
  updateFilterBar()
  renderAllList()
  syncUrl(true)
})

document.querySelectorAll('.tab').forEach(function (t) {
  t.addEventListener('click', function () {
    if (state.demoId) closeDetail({ skipUrl: true, replace: true })
    var view = t.dataset.view
    if (view === 'v-works') {
      state.category = null
      state.query = ''
      var qInput = document.getElementById('q')
      if (qInput) qInput.value = ''
      updateTileHighlight()
    }
    showView(view)
  })
})

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && state.demoId) {
    e.preventDefault()
    history.back()
  }
})

window.addEventListener('popstate', function (ev) {
  var s = ev.state
  if (s && s.demoId) {
    openDetail(s.demoId, { skipUrl: true, replace: true })
    return
  }
  if (detail.classList.contains('open')) {
    closeDetail({ skipUrl: true })
  }
  if (s) {
    state.view = s.view || 'v-works'
    state.category = s.category || null
    state.query = s.query || ''
    state.demoId = null
    var qInput = document.getElementById('q')
    if (qInput) qInput.value = state.query
    updateTileHighlight()
    updateFilterBar()
    showView(state.view, { skipUrl: true, replace: true })
  } else {
    applyFromLocation(true)
  }
})

function applyFromLocation(replace) {
  var params = new URLSearchParams(location.search)
  var demo = params.get('demo')
  if (demo) {
    var d = getDemoById(demo)
    if (!d) {
      state.demoId = null
      showView('v-all', { replace: true })
      return
    }
    var viewHint = params.get('view')
    if (viewHint === 'all') state.view = 'v-all'
    else state.view = 'v-works'
    showView(state.view, { skipUrl: true, replace: true })
    openDetail(demo, { skipUrl: true, replace: true })
    syncUrl(true)
    return
  }
  var view = params.get('view')
  state.category = params.get('cat') || null
  state.query = params.get('q') || ''
  var qInput = document.getElementById('q')
  if (qInput) qInput.value = state.query
  updateTileHighlight()
  updateFilterBar()
  if (view === 'all') showView('v-all', { replace: !!replace, skipUrl: true })
  else if (view === 'cat') showView('v-cat', { replace: !!replace, skipUrl: true })
  else if (view === 'how') showView('v-how', { replace: !!replace, skipUrl: true })
  else if (view === 'me') showView('v-me', { replace: !!replace, skipUrl: true })
  else showView('v-works', { replace: !!replace, skipUrl: true })
  syncUrl(true)
}

/* ---------- motion (sticky cards) ---------- */
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
var bar = document.querySelector('.appbar')
function fitHeader() {
  document.documentElement.style.setProperty('--hh', Math.round(bar.offsetHeight + 14) + 'px')
}
fitHeader()
window.addEventListener('resize', fitHeader)
window.addEventListener('load', fitHeader)

var io = null
if (!reduce && 'IntersectionObserver' in window) {
  io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    })
  }, { rootMargin: '-' + (bar.offsetHeight + 20) + 'px 0px -8% 0px', threshold: 0.01 })
}
function watch(root) {
  if (!root) return
  root.querySelectorAll('.rv, .card').forEach(function (el) {
    if (!io) { el.classList.add('in'); return }
    if (!el.classList.contains('in')) io.observe(el)
  })
}
watch(document)

var tick = false
function onScroll() {
  var cards = [].slice.call(document.querySelectorAll('#cards .card'))
  var mocks = [].slice.call(document.querySelectorAll('#cards .mock .body'))
  var hh = bar.offsetHeight + 14
  var h = window.innerHeight
  var vis = 0
  cards.forEach(function (card, i) {
    if (card.classList.contains('hide')) return
    var idx = vis++
    var next = null
    for (var j = i + 1; j < cards.length; j++) {
      if (!cards[j].classList.contains('hide')) { next = cards[j]; break }
    }
    var p = 0
    if (next) {
      var pin = hh + idx * 9
      var start = pin + card.offsetHeight
      var end = pin + 30
      var nt = next.getBoundingClientRect().top
      p = (start - nt) / (start - end)
      p = p < 0 ? 0 : (p > 1 ? 1 : p)
    }
    card.style.transform = 'translate3d(0,' + (-7 * p).toFixed(1) + 'px,0) scale(' + (1 - 0.07 * p).toFixed(3) + ')'
    var dim = card.querySelector('.dim')
    if (dim) dim.style.opacity = (0.5 * p).toFixed(3)
  })
  mocks.forEach(function (m) {
    var r = m.getBoundingClientRect()
    if (r.bottom < -100 || r.top > h + 100) return
    var q = ((r.top + r.height / 2) - h / 2) / h
    m.style.transform = 'translate3d(0,' + (q * 16).toFixed(1) + 'px,0)'
  })
  tick = false
}
if (!reduce) {
  window.addEventListener('scroll', function () {
    if (!tick) { tick = true; requestAnimationFrame(onScroll) }
  }, { passive: true })
  window.addEventListener('resize', onScroll)
  onScroll()
}

applyFromLocation(true)

// silence unused import warning for DEMOS in some bundlers
void DEMOS
