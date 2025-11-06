'use client'

import { useEffect, useState } from 'react'

interface TranslatorProps {
  text: string
  targetLang: string
}

export default function Translator({ text, targetLang }: TranslatorProps) {
  const [translatedText, setTranslatedText] = useState(text)

  useEffect(() => {
    if (!text || text.trim() === '') return

    // 🧠 Skip translation if language is English
    if (targetLang === 'en') {
      setTranslatedText(text)
      return
    }

    const translate = async () => {
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLang }),
        })

        if (!res.ok) {
          console.error('Translation failed', await res.text())
          return
        }

        const data = await res.json()
        setTranslatedText(data.translatedText)
      } catch (err) {
        console.error('Translation error:', err)
      }
    }

    translate()
  }, [text, targetLang])

  return <>{translatedText}</>
}
