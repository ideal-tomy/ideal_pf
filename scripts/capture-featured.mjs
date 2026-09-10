/**
 * Capture distinct screens for featured demos (390x844).
 * Usage: node scripts/capture-featured.mjs
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outRoot = path.join(__dirname, '..', 'public', 'images', 'demos')

async function shot(page, dest) {
  await page.screenshot({ path: dest, type: 'jpeg', quality: 84 })
  console.log('wrote', dest)
}

async function softClick(page, locator) {
  try {
    if (await locator.count()) {
      await locator.first().click({ timeout: 3000 })
      await page.waitForTimeout(900)
      return true
    }
  } catch { /* ignore */ }
  return false
}

async function captureConstruction(page, dir) {
  await page.goto('https://construction-demo-six.vercel.app/photo', { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(600)
  await shot(page, path.join(dir, '01.jpg'))

  await page.goto('https://construction-demo-six.vercel.app/report', { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(500)
  await softClick(page, page.getByText('体験をはじめる', { exact: false }))
  await page.waitForTimeout(800)
  await softClick(page, page.getByText('サンプル', { exact: false }))
  await page.waitForTimeout(2500)
  await shot(page, path.join(dir, '02.jpg'))

  await page.goto('https://construction-demo-six.vercel.app/ops', { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(600)
  await shot(page, path.join(dir, '03.jpg'))
}

async function captureCustomerSupport(page, dir) {
  await page.goto('https://customer-support-demo-lime.vercel.app/', { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(800)
  await softClick(page, page.getByText('サンプル', { exact: false }))
  await softClick(page, page.getByText('閉じる', { exact: false }))
  await shot(page, path.join(dir, '01.jpg'))

  // pick an industry card
  const industry = page.locator('button, [role="button"], a').filter({ hasText: /小売|飲食|美容|クリニック|不動産|東和|ダイニング|Salon/ }).first()
  if (!(await softClick(page, industry))) {
    await softClick(page, page.locator('button').nth(1))
  }
  await page.waitForTimeout(800)
  await shot(page, path.join(dir, '02.jpg'))

  // try send a sample prompt / click chip
  const chip = page.locator('button, [role="button"]').filter({ hasText: /返品|営業|予約|Mini|配送/ }).first()
  await softClick(page, chip)
  await page.waitForTimeout(2000)
  await shot(page, path.join(dir, '03.jpg'))
}

async function captureShift(page, dir) {
  await page.goto('https://shift-demo-ten.vercel.app/', { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(800)
  await softClick(page, page.getByRole('button', { name: 'スタッフ' }).or(page.getByText('スタッフ', { exact: true })))
  await softClick(page, page.getByText('提出', { exact: false }).first())
  await page.waitForTimeout(500)
  await shot(page, path.join(dir, '01.jpg'))

  await softClick(page, page.getByRole('button', { name: '店長' }).or(page.getByText('店長', { exact: true })))
  await page.waitForTimeout(400)
  await softClick(page, page.getByText('最適案を作る', { exact: false }))
  await page.waitForTimeout(1200)
  await shot(page, path.join(dir, '02.jpg'))

  await softClick(page, page.getByText('確定して通知', { exact: false }))
  await page.waitForTimeout(1000)
  await softClick(page, page.getByText('確定通知', { exact: false }))
  await softClick(page, page.getByText('確認', { exact: true }))
  await page.waitForTimeout(800)
  await shot(page, path.join(dir, '03.jpg'))
}

async function captureQuality(page, dir) {
  await page.goto('https://axeonmanufacturing02.vercel.app/', { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(800)

  await softClick(page, page.locator('[data-action="incident"]'))
  await page.waitForTimeout(500)
  await shot(page, path.join(dir, '01.jpg'))

  await softClick(page, page.locator('[data-action="root-cause"]'))
  await page.waitForTimeout(500)
  await shot(page, path.join(dir, '02.jpg'))

  await softClick(page, page.locator('[data-action="corrective"]'))
  await page.waitForTimeout(500)
  await shot(page, path.join(dir, '03.jpg'))
}

async function captureKaigo(page, dir) {
  await page.goto('https://kaigo-handoff-demo.vercel.app/memo', { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(700)
  await softClick(page, page.getByText('はじめる', { exact: false }))
  await softClick(page, page.getByText('サンプル', { exact: false }))
  await shot(page, path.join(dir, '01.jpg'))

  await page.goto('https://kaigo-handoff-demo.vercel.app/karte', { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(700)
  await shot(page, path.join(dir, '02.jpg'))

  await page.goto('https://kaigo-handoff-demo.vercel.app/records', { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(700)
  await shot(page, path.join(dir, '03.jpg'))
}

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    locale: 'ja-JP'
  })
  const page = await context.newPage()

  const jobs = [
    ['construction-record', captureConstruction],
    ['customer-support', captureCustomerSupport],
    ['shift', captureShift],
    ['quality-incident', captureQuality],
    ['kaigo-handoff', captureKaigo]
  ]

  for (const [id, fn] of jobs) {
    const dir = path.join(outRoot, id)
    await mkdir(dir, { recursive: true })
    console.log('---', id)
    await fn(page, dir)
  }

  await browser.close()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
