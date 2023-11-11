export const downloadFile = function (
  data: any,
  filename: string,
  mime = 'application/json',
  bom?: string
) {
  let blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  let blob = new Blob(blobData, { type: mime })
  let blobURL =
    window.URL && window.URL.createObjectURL
      ? window.URL.createObjectURL(blob)
      : window.webkitURL.createObjectURL(blob)
  let tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', filename)
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  setTimeout(() => {
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
  }, 200)
}
