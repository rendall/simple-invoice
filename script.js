const save = (e) => {
  const keyName = e.target.classList[0]
  const value = e.target.innerText
  const rowIndex = (!!e.target.parentElement.rowIndex) ? e.target.parentElement.rowIndex : 0
  const key = rowIndex === 0 ? keyName : `item-${rowIndex}__${keyName}`
  document.cookie = `${key}=${value}`
}

const onFocus = (e) => document.execCommand('selectAll', false, null)

const makeTitle = () => {
  const companyName = document.querySelector(".company-name").innerText
  const invoiceLabel = document.querySelector(".invoice-number__label").innerText
  const invoiceValue = document.querySelector(".invoice-number__value" ).innerText

  document.title = `${companyName} ${invoiceLabel}${invoiceValue}`.replace(/[^\s\d\w\.#]/g,"")
}

const calculate = () => {
  const items = Array.from(document.querySelectorAll("tr.item"))
  const parseValue = (str) => parseFloat(str.replace(",", ".").replace(/[^\.\d]/g, ""))
  const getValue = (tr, index) => parseValue(tr.children[index].innerText)
  const getQuantity = (tr) => getValue(tr, 1)
  const getPrice = (tr) => getValue(tr, 2)
  const subtotal = items.reduce((sum, row) => getQuantity(row) * getPrice(row) + sum, 0)
  const vat = subtotal * 0.24
  const total = subtotal * 1.24
  const addGap = (str) => str.slice(0, -6) + " " + str.slice(-6)
  const formatValue = (x) => addGap(x.toFixed(2)).replace(".", ",") + "€"
  document.querySelector(".subtotal").children[1].innerText = formatValue(subtotal)
  document.querySelector(".taxes").children[1].innerText = formatValue(vat)
  document.querySelector(".total").children[1].innerText = formatValue(total)
}

const populateInvoice = () => {
  const keyValues = document.cookie.split(';').map(c => c.trim())
  const info = keyValues.filter(kv => !/^item-\d?/.test(kv))
  info.filter(i => i.length > 0).forEach(i => {
    const kv = i.split('=')
    document.querySelector(`.${kv[0]}`).innerText = kv[1]
    if (kv[0]==="company-name") document.title = kv[1]
  })
  if (document.querySelector(".invoice-created__value").innerText.trim() === "") document.querySelector(".invoice-created__value").innerText = new Date().toLocaleDateString()
  const dueIn = 2505600000 // 30 days of time in milliseconds 
  if (document.querySelector(".invoice-due__value").innerText.trim() === "") document.querySelector(".invoice-due__value").innerText = new Date(Date.now() + dueIn).toLocaleDateString()
  const items = keyValues.filter(kv => /^item-\d?/.test(kv))
  items.forEach(i => {
    const kv = i.split("=");
    const k = kv[0]
    const itemId = k.split("__")[0];
    const key = k.split("__")[1];
    const value = kv[1];
    document.querySelector(`.${itemId} .${key}`).innerText = value;
}

const initialize = () => {
  window.addEventListener("beforeprint", makeTitle)
  const editables = Array.from(document.querySelectorAll("[contenteditable]"))
  editables.forEach(e => e.addEventListener("input", save))
  editables.forEach(e => e.addEventListener("focus", onFocus))
  const tableValues = Array.from(document.querySelectorAll("table.itemization .item [contenteditable]"))
  tableValues.forEach(e => e.addEventListener("input", calculate))
  populateInvoice()
  calculate()
  editables[0].focus()
}

initialize()
