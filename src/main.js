import './style.css'
import { ICON, SCR, DEMOS, OTHERS } from './data.js'

const cardsBox = document.getElementById('cards')
cardsBox.innerHTML = DEMOS.map(function(d,i){
  return '<button class="card '+d.cls+'" data-cat="'+d.cat+'" data-id="'+d.id+'" style="--i:'+i+'">'
    + '<div class="dim"></div>'
    + '<div class="mock"><div class="body scr">'+SCR[d.shots[0][0]]+'</div></div>'
    + '<div class="eyebrow"><span class="chip">'+ICON[d.icon]+'</span>'+d.catLabel+'</div>'
    + '<h2>'+d.title+'</h2>'
    + '<p class="lead">'+d.lead+'</p>'
    + '<span class="cta">くわしく見る</span>'
    + '</button>'
}).join('')

document.getElementById('others').innerHTML = OTHERS.map(function(o){
  return '<button class="item rv" data-cat="'+o.cat+'"><span class="th" style="background:'+o.bg+'">'+(ICON[o.icon]||ICON.doc)+'</span>'
    + '<span><span class="tt">'+o.tt+'</span><span class="cc">'+o.cc+'</span></span><span class="go">›</span></button>'
}).join('')

const published = DEMOS.length + OTHERS.length
const countEl = document.querySelector('.count b')
if (countEl) countEl.textContent = String(published)

const detail = document.getElementById('detail')
const dIn = document.getElementById('dIn')

function openCta(d){
  if (d.url) {
    return '<a class="go" href="'+d.url+'" target="_blank" rel="noopener">デモを開く</a>'
      + '<div class="note">別のページが開きます。<br>登録は要りません。</div>'
  }
  return '<span class="go is-off" aria-disabled="true">デモを開く</span>'
    + '<div class="note">公開URLは準備中です。<br>後から設置します。</div>'
}

function buildDetail(d){
  var meta = [
    {k:'利用価値', v:d.score.toFixed(1), s:'自己採点'},
    {k:'業種', v:d.catLabel.split('・')[0], s:d.catLabel},
    {k:'使う人', v:d.users.split('と')[0], s:d.users},
    {k:'つくった期間', v:d.span, s:d.made}
  ]
  return ''
  + '<div class="d-hero '+d.cls+'">'
  +   '<button class="back" id="dBack"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>'
  +   '<div class="art"><div class="body scr" style="background:#0d0a15;border:1px solid rgba(255,255,255,.2);border-radius:20px;padding:11px 10px;box-shadow:0 26px 52px rgba(0,0,0,.55)">'+SCR[d.shots[0][0]]+'</div></div>'
  + '</div>'
  + '<div class="d-head">'
  +   '<div class="d-icon '+d.cls+'">'+ICON[d.icon]+'</div>'
  +   '<div><h1>'+d.plain+'</h1><div class="one">'+d.one+'</div></div>'
  + '</div>'
  + '<div class="d-open">'+openCta(d)+'</div>'
  + '<div class="strip">'+meta.map(function(m){
        return '<div class="cel"><div class="k">'+m.k+'</div><div class="v">'+m.v+'</div><div class="s">'+(m.s||'')+'</div></div>'
      }).join('')+'</div>'
  + '<div class="shots">'+d.shots.map(function(s){
        return '<div class="shot"><div class="scr">'+SCR[s[0]]+'</div><div class="cap">'+s[1]+'</div></div>'
      }).join('')+'</div>'
  + '<div class="d-sec"><h3>どんなときに使うか</h3><p>'+d.when+'</p></div>'
  + '<div class="d-sec"><h3>できること</h3><div class="bul">'+d.can.map(function(c){return '<div>'+c+'</div>';}).join('')+'</div></div>'
  + '<div class="d-sec"><h3>利用価値（自己採点）</h3>'
  +   '<div class="sc-top"><div class="sc-big">'+d.score.toFixed(1)+'</div><div class="sc-of">5点のうち</div></div>'
  +   '<div class="sc-bars">'+d.sc.map(function(s){
        return '<div class="sc-row"><div class="n">'+s[0]+'</div><div class="t"><i data-w="'+(s[1]/5*100)+'"></i></div><div class="p">'+s[1].toFixed(1)+'</div></div>'
      }).join('')+'</div>'
  +   '<p class="sc-note">この点数は、使った人の評価ではありません。つくった本人が付けた点数です。良く見せるためではなく、向き不向きを先に分かってもらうために載せています。</p></div>'
  + '<div class="d-sec"><h3>使うときの前提</h3><div class="spec">'+d.spec.map(function(r){
        return '<div class="r"><div class="k">'+r[0]+'</div><div class="v">'+r[1]+'</div></div>'
      }).join('')+'</div></div>'
  + '<div class="d-sec"><h3>ほかのデモ</h3></div>'
  + '<div class="shots" style="margin-top:12px">'+DEMOS.filter(function(x){return x.id!==d.id;}).map(function(x){
        return '<button class="shot '+x.cls+'" data-goto="'+x.id+'" style="width:150px;min-height:132px;text-align:left;border:none">'
          + '<div style="width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.2);display:grid;place-items:center">'+ICON[x.icon]+'</div>'
          + '<div style="font-size:13px;font-weight:700;line-height:1.5;margin-top:10px">'+x.plain+'</div></button>'
      }).join('')+'</div>'
}

function openDetail(id){
  var d = DEMOS.filter(function(x){return x.id===id;})[0]
  if(!d) return
  dIn.innerHTML = buildDetail(d)
  detail.scrollTop = 0
  detail.classList.add('open')
  document.body.classList.add('lock')
  setTimeout(function(){
    dIn.querySelectorAll('.sc-row .t i').forEach(function(i){ i.style.width = i.dataset.w + '%' })
  }, 260)
  if(history.state === null || history.state.d !== 1) history.pushState({d:1}, '')
}
function closeDetail(){
  detail.classList.remove('open')
  document.body.classList.remove('lock')
}
document.addEventListener('click', function(e){
  var c = e.target.closest('.card')
  if(c){ openDetail(c.dataset.id); return }
  var g = e.target.closest('[data-goto]')
  if(g){ openDetail(g.dataset.goto); return }
  if(e.target.closest('#dBack')){ history.back() }
})
window.addEventListener('popstate', function(){ closeDetail() })

;(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  var bar = document.querySelector('.appbar')
  function fitHeader(){ document.documentElement.style.setProperty('--hh', Math.round(bar.offsetHeight + 14) + 'px') }
  fitHeader(); window.addEventListener('resize', fitHeader); window.addEventListener('load', fitHeader)

  var io = null
  if(!reduce && 'IntersectionObserver' in window){
    io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { rootMargin: '-' + (bar.offsetHeight + 20) + 'px 0px -8% 0px', threshold: 0.01 })
  }
  function watch(root){
    root.querySelectorAll('.rv, .card').forEach(function(el){
      if(!io){ el.classList.add('in'); return }
      if(!el.classList.contains('in')) io.observe(el)
    })
  }
  watch(document)

  var cards = [].slice.call(document.querySelectorAll('.card'))
  var mocks = [].slice.call(document.querySelectorAll('.mock .body'))
  var tick = false
  function onScroll(){
    var hh = bar.offsetHeight + 14, h = window.innerHeight, vis = 0
    cards.forEach(function(card, i){
      if(card.classList.contains('hide')) return
      var idx = vis++, next = null
      for(var j=i+1;j<cards.length;j++){ if(!cards[j].classList.contains('hide')){ next = cards[j]; break } }
      var p = 0
      if(next){
        var pin = hh + idx * 9
        var start = pin + card.offsetHeight, end = pin + 30
        var nt = next.getBoundingClientRect().top
        p = (start - nt) / (start - end)
        p = p < 0 ? 0 : (p > 1 ? 1 : p)
      }
      card.style.transform = 'translate3d(0,' + (-7*p).toFixed(1) + 'px,0) scale(' + (1 - 0.07*p).toFixed(3) + ')'
      var dim = card.querySelector('.dim')
      if(dim) dim.style.opacity = (0.5*p).toFixed(3)
    })
    mocks.forEach(function(m){
      var r = m.getBoundingClientRect()
      if(r.bottom < -100 || r.top > h + 100) return
      var q = ((r.top + r.height/2) - h/2) / h
      m.style.transform = 'translate3d(0,' + (q*16).toFixed(1) + 'px,0)'
    })
    tick = false
  }
  if(!reduce){
    window.addEventListener('scroll', function(){ if(!tick){ tick = true; requestAnimationFrame(onScroll) } }, {passive:true})
    window.addEventListener('resize', onScroll)
    onScroll()
  }

  var tabs = document.querySelectorAll('.tab')
  tabs.forEach(function(t){
    t.addEventListener('click', function(){
      tabs.forEach(function(x){ x.classList.remove('on') })
      t.classList.add('on')
      document.querySelectorAll('.view').forEach(function(v){ v.classList.remove('on') })
      var v = document.getElementById(t.dataset.view)
      v.classList.add('on')
      window.scrollTo(0,0); watch(v)
      if(!reduce) requestAnimationFrame(onScroll)
    })
  })

  var tiles = document.querySelectorAll('.tile')
  tiles.forEach(function(tile){
    tile.addEventListener('click', function(){
      var was = tile.classList.contains('on')
      tiles.forEach(function(x){ x.classList.remove('on') })
      if(!was) tile.classList.add('on')
      var cat = was ? null : tile.dataset.cat
      document.querySelectorAll('[data-cat]').forEach(function(el){
        if(el.classList.contains('tile')) return
        var hit = !cat || el.dataset.cat === cat || el.dataset.cat === 'all'
        el.classList.toggle('hide', !hit)
      })
      var vis = 0
      cards.forEach(function(c){ if(!c.classList.contains('hide')) c.style.setProperty('--i', vis++) })
      window.scrollTo({top:0, behavior:'smooth'})
      if(!reduce) requestAnimationFrame(onScroll)
    })
  })
})()
