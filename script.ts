const SIMPLE_INVOICE_PREFIX = "simple-invoice-"

/** Save on blur: Save the value of the target in the blur event as a browser cookie */
const save = (e: FocusEvent) => {
  const target = e.target as HTMLInputElement
  const key = target.classList[0]
  const value = target.innerText
  const cookie = `${SIMPLE_INVOICE_PREFIX}${key}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
  document.cookie = cookie
}

const getText = (selector: string) => (document.querySelector(selector) as HTMLDivElement).innerText
const setText = (selector: string, value: string) => {
  console.log("settingText", selector, value)
  const div = document.querySelector(selector) as HTMLDivElement
  if (div) div.innerText = value
  else {
    console.error(`${selector} not found`)
    console.trace()
  }
}

const getTableRow = (selector: string) => document.querySelector(selector) as HTMLTableRowElement

/** Set the title of the HTML page, which also sets the title of the document printed as a PDF */
const makeTitle = () => {
  const companyName = getText(".company-name")
  const invoiceLabel = getText(".invoice-number__label")
  const invoiceValue = getText(".invoice-number__value")

  document.title = `${companyName} ${invoiceLabel}${invoiceValue}`.replace(/[^\s\d\w\.#]/g, "")
}

/** Update subtotal, taxes and total based on the value of '.item' cells in table */
const calculate = () => {
  const items = Array.from(document.querySelectorAll("tr.item")) as HTMLTableRowElement[]
  const parseValue = (str: string) => parseFloat(str.replace(",", ".").replace(/[^\.\d\-]/g, ""))
  const getValue = (tr: HTMLTableRowElement, index: number) => parseValue((tr.children[index] as HTMLDivElement).innerText)
  const getQuantity = (tr: HTMLTableRowElement) => getValue(tr, 1)
  const getPrice = (tr: HTMLTableRowElement) => getValue(tr, 2)
  const addGap = (str: string) => str.slice(0, -6) + " " + str.slice(-6)
  const formatValue = (x: number) => addGap(x.toFixed(2)).replace(".", ",") + "€"

  const subtotal = items.reduce((sum: number, row: HTMLTableRowElement): number => getQuantity(row) * getPrice(row) + sum, 0)
  setText(".subtotal__value", formatValue(subtotal))

  const vat = subtotal * 0.24
  setText(".taxes__value", formatValue(vat))

  const total = subtotal * 1.24
  setText(".total__value", formatValue(total))
}

/** Insert values from cookies into the invoice table */
const populateInvoice = () => {
  const keyValues = document.cookie.split(";").map(c => c.trim())
  const info = keyValues.filter(kv => kv.startsWith(SIMPLE_INVOICE_PREFIX)).map(kv => kv.slice(SIMPLE_INVOICE_PREFIX.length))

  info.filter(i => i.length > 0).forEach(i => {
    const [key, value] = i.split("=")
    setText(`.${key}`, value)
    if (key === "company-name") document.title = value
  })
  if (getText(".invoice-created__value").trim() === "") setText(".invoice-created__value", new Date().toLocaleDateString("fi"))
  const dueIn = 2505600000 // 30 days of time in milliseconds 
  if (getText(".invoice-due__value").trim() === "") setText(".invoice-due__value", new Date(Date.now() + dueIn).toLocaleDateString("fi"))
}

const initialize = () => {
  window.addEventListener("beforeprint", makeTitle)
  const editables = Array.from(document.querySelectorAll("[contenteditable]")) as HTMLInputElement[]
  editables.forEach(e => e.addEventListener("blur", save))
  const tableValues = Array.from(document.querySelectorAll("table.itemization .item [contenteditable]"))
  tableValues.forEach(e => e.addEventListener("input", calculate))
  populateInvoice()
  calculate()
  editables[0].focus()
}

initialize()
