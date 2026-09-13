import {chromium} from 'playwright'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function shot(page, id) {
  const out = path.join(root, 'public', 'images', 'demos', id, 'catalog.jpg')
  await page.screenshot({path: out, type: 'jpeg', quality: 82, fullPage: false})
  console.log('ok', id, page.url())
}

async function clickAny(page, texts) {
  for (const t of texts) {
    const el = page.locator('a,button,[role=button]').filter({hasText: t}).first()
    if (await el.count()) {
      await el.click({timeout: 5000}).catch(() => {})
      await page.waitForTimeout(1000)
      return true
    }
  }
  return false
}

const browser = await chromium.launch({headless: true, channel: 'msedge'})
const context = await browser.newContext({
  viewport: {width: 390, height: 844},
  deviceScaleFactor: 2,
  locale: 'ja-JP',
})

{
  const page = await context.newPage()
  await page.goto('https://ideal-tomy.github.io/childcare_demo/', {waitUntil: 'domcontentloaded', timeout: 60000})
  await page.waitForTimeout(1500)
  await clickAny(page, ['今日の様子を開く', '今日の様子', 'はじめる', '記録'])
  await page.waitForTimeout(800)
  await shot(page, 'childcare')
  await page.close()
}

{
  const page = await context.newPage()
  await page.goto('https://approval-diagram.vercel.app/', {waitUntil: 'domcontentloaded', timeout: 60000})
  await page.waitForTimeout(1500)
  await clickAny(page, ['体験する', '体験', 'はじめる', '照合'])
  await page.waitForTimeout(800)
  await shot(page, 'approval-inspection')
  await page.close()
}

{
  const page = await context.newPage()
  await page.goto('https://cause-demo.vercel.app/', {waitUntil: 'domcontentloaded', timeout: 60000})
  await page.waitForTimeout(1500)
  await clickAny(page, ['仕組みを見る', '次へ', 'はじめる'])
  await page.waitForTimeout(800)
  await shot(page, 'cause-demo')
  await page.close()
}

{
  const page = await context.newPage()
  await page.goto('https://product-flow-jet.vercel.app/play/minato-factory', {waitUntil: 'domcontentloaded', timeout: 60000})
  await page.waitForTimeout(1500)
  await clickAny(page, ['スキップして触る', '紹介を見る'])
  // if intro opened, skip or wait
  await page.waitForTimeout(1200)
  await clickAny(page, ['スキップ', '閉じる', '次へ', 'はじめる'])
  await page.waitForTimeout(800)
  await shot(page, 'product-flow-mfg')
  await page.close()
}

{
  const page = await context.newPage()
  await page.goto('https://kaigo-operation-demo.vercel.app/experience/kaigo-care-dx', {waitUntil: 'domcontentloaded', timeout: 60000})
  await page.waitForTimeout(1500)
  await clickAny(page, ['この画面で体験を開始', '体験を開始', '開始'])
  await page.waitForTimeout(1200)
  await shot(page, 'kaigo-3role')
  await page.close()
}

await browser.close()
