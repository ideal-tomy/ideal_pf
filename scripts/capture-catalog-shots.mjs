/**
 * Capture catalog listing screenshots from live demo URLs.
 * Viewport: 390x844. Saves public/images/demos/{id}/catalog.jpg
 */
import {chromium} from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outRoot = path.join(root, 'public', 'images', 'demos')

const targets = [
  {
    id: 'field-dandori',
    url: 'https://rainbow-tarsier-5ce845.netlify.app/',
  },
  {
    id: 'contractor-matching',
    url: 'https://hookapp-demo.vercel.app/',
    after: async (page) => {
      const go = page.getByRole('button', {name: /はじめる|体験|ランキング|スコア/}).first()
      if (await go.count()) await go.click({timeout: 3000}).catch(() => {})
      await page.waitForTimeout(800)
    },
  },
  {
    id: 'product-flow-mfg',
    url: 'https://product-flow-jet.vercel.app/manufacturing',
    after: async (page) => {
      const pick = page.getByText(/現場判断|工場|判断/).first()
      if (await pick.count()) await pick.click({timeout: 3000}).catch(() => {})
      await page.waitForTimeout(1000)
    },
  },
  {
    id: 'approval-inspection',
    url: 'https://approval-diagram.vercel.app/',
    after: async (page) => {
      const go = page.getByRole('button', {name: /体験|はじめる|受入|照合/}).first()
      if (await go.count()) await go.click({timeout: 3000}).catch(() => {})
      await page.waitForTimeout(1000)
    },
  },
  {
    id: 'cause-demo',
    url: 'https://cause-demo.vercel.app/',
    after: async (page) => {
      const go = page.getByRole('link', {name: /はじめる|体験|分析|進む/}).first()
      if (await go.count()) await go.click({timeout: 3000}).catch(() => {})
      else {
        const btn = page.getByRole('button', {name: /はじめる|体験|分析|進む/}).first()
        if (await btn.count()) await btn.click({timeout: 3000}).catch(() => {})
      }
      await page.waitForTimeout(1000)
    },
  },
  {
    id: 'childcare',
    url: 'https://ideal-tomy.github.io/childcare_demo/',
    after: async (page) => {
      const go = page.getByRole('button', {name: /記録|はじめる|今日/}).first()
      if (await go.count()) await go.click({timeout: 3000}).catch(() => {})
      await page.waitForTimeout(800)
    },
  },
  {
    id: 'voice-karte-simple',
    url: 'https://lambent-smakager-7bcf0a.netlify.app/',
  },
  {
    id: 'kaigo-3role',
    url: 'https://kaigo-operation-demo.vercel.app/',
  },
  {
    id: 'disaster-facility',
    url: 'https://disaster-prevention-demo.vercel.app/',
    after: async (page) => {
      const go = page.getByRole('button', {name: /施設|はじめる|コンソール|開く/}).first()
      if (await go.count()) await go.click({timeout: 3000}).catch(() => {})
      await page.waitForTimeout(800)
    },
  },
  {
    id: 'gym-facility',
    url: 'https://disaster-prevention-demo02.vercel.app/',
    after: async (page) => {
      const go = page.getByRole('button', {name: /施設|はじめる|管理|開く/}).first()
      if (await go.count()) await go.click({timeout: 3000}).catch(() => {})
      await page.waitForTimeout(800)
    },
  },
  {
    id: 'chiiki-bunka',
    url: 'https://chiiki-demo-site.vercel.app/',
  },
  {
    id: 'shikomi-record',
    url: 'https://shikomi-record-demo.vercel.app/',
    after: async (page) => {
      const go = page.getByRole('button', {name: /職人|はじめる|記録|見回り/}).first()
      if (await go.count()) await go.click({timeout: 3000}).catch(() => {})
      await page.waitForTimeout(800)
    },
  },
  {
    id: 'haken-dash',
    url: 'https://haken-dash.vercel.app/',
    after: async (page) => {
      const go = page.getByRole('link', {name: /候補|ダッシュ|はじめる/}).first()
      if (await go.count()) await go.click({timeout: 3000}).catch(() => {})
      else {
        const btn = page.getByRole('button', {name: /候補|ダッシュ|はじめる/}).first()
        if (await btn.count()) await btn.click({timeout: 3000}).catch(() => {})
      }
      await page.waitForTimeout(800)
    },
  },
  {
    id: 'sfa-legal',
    url: 'https://sfa-legal.vercel.app/',
    after: async (page) => {
      const go = page.getByRole('button', {name: /はじめる|相談|案件/}).first()
      if (await go.count()) await go.click({timeout: 3000}).catch(() => {})
      await page.waitForTimeout(800)
    },
  },
  {
    id: 'vietnam-haken',
    url: 'https://vietnam-demo-zeta.vercel.app/',
    after: async (page) => {
      const go = page.getByRole('button', {name: /応募|はじめる|候補|選考/}).first()
      if (await go.count()) await go.click({timeout: 3000}).catch(() => {})
      else {
        const link = page.getByRole('link', {name: /応募|候補|選考/}).first()
        if (await link.count()) await link.click({timeout: 3000}).catch(() => {})
      }
      await page.waitForTimeout(800)
    },
  },
  {
    id: 'internal-knowledge',
    url: 'https://internal-knowledge-demo.vercel.app/',
  },
]

const results = []
const browser = await chromium.launch({headless: true, channel: 'msedge'})
try {
  const context = await browser.newContext({
    viewport: {width: 390, height: 844},
    deviceScaleFactor: 2,
    locale: 'ja-JP',
  })
  for (const t of targets) {
    const page = await context.newPage()
    const dir = path.join(outRoot, t.id)
    await fs.mkdir(dir, {recursive: true})
    const out = path.join(dir, 'catalog.jpg')
    try {
      await page.goto(t.url, {waitUntil: 'domcontentloaded', timeout: 60000})
      await page.waitForTimeout(1500)
      if (t.after) await t.after(page)
      await page.waitForTimeout(500)
      await page.screenshot({path: out, type: 'jpeg', quality: 82, fullPage: false})
      const st = await fs.stat(out)
      results.push({id: t.id, ok: true, bytes: st.size, url: page.url()})
      console.log('ok', t.id, st.size, page.url())
    } catch (e) {
      results.push({id: t.id, ok: false, error: String(e.message || e), url: t.url})
      console.error('fail', t.id, e.message || e)
    } finally {
      await page.close()
    }
  }
} finally {
  await browser.close()
}

const failed = results.filter(r => !r.ok)
await fs.writeFile(
  path.join(root, 'docs', 'catalog-review', 'catalog-capture.json'),
  JSON.stringify({capturedAt: new Date().toISOString(), results}, null, 2)
)
console.log(JSON.stringify({ok: results.filter(r => r.ok).length, fail: failed.length, failed}, null, 2))
if (failed.length) process.exitCode = 1
