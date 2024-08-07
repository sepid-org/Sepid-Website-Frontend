import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from 'react'

const Frame = ({
  content,
  frameProps,
  title = '',
  handleUpdateContent
}) => {
  const [contentRef, setContentRef] = useState(null)
  const doc =
    contentRef?.contentDocument ?? contentRef?.contentWindow?.document

  const fixHeight = useCallback(() => {
    if (!contentRef || !doc?.documentElement?.scrollHeight) {
      return
    }
    contentRef.style.height = doc.documentElement.scrollHeight * 1.01 + 'px'
  }, [contentRef, doc?.documentElement?.scrollHeight])

  useEffect(() => {
    if (!doc) {
      return
    }
    doc.open()
    doc.write(
      `<head><link rel='stylesheet' href='${process.env.PUBLIC_URL}/styles/frame.css' /><link rel='stylesheet' href='${process.env.PUBLIC_URL}/styles/font.css' /><base target="_blank" /></head><body>${content}</body>`
    )
    doc.close()

    doc.fonts.ready.then(fixHeight)

    // todo: fix TOF:
    setTimeout(() => {
      fixHeight()
    }, 100)
    for (let i = 1; i <= 7; i++) {
      setTimeout(() => {
        fixHeight()
      }, 300 * i)
    }
    setTimeout(() => {
      fixHeight()
    }, 5000)
    setTimeout(() => {
      fixHeight()
    }, 10000)
    // end of TOF
  }, [doc, content, fixHeight])

  useEffect(() => {
    if (!doc) {
      return
    }
    handleUpdateContent(doc)
  }, [content, doc])

  useLayoutEffect(() => {
    window.addEventListener('resize', fixHeight)
    return () => { window.removeEventListener('resize', fixHeight) }
  }, [fixHeight])

  useEffect(() => {
    fixHeight()
  }, [content, contentRef, fixHeight])

  return <iframe title={title} {...frameProps} ref={setContentRef}></iframe>
}

export default Frame;