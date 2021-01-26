export default async () => {
  const [htmlCode, cssCode, jsCode] = await Promise.all([
    import('!raw-loader!./codepan.html'),
    import('!raw-loader!./codepan.css'),
    import('!raw-loader!./codepan.js')
  ])

  return {
    html: {
      code: htmlCode,
      transformer: 'html'
    },
    js: {
      code: jsCode,
      transformer: 'js'
    },
    css: {
      code: cssCode,
      transformer: 'css'
    },
    showPans: ['js', 'output']
  }
}
