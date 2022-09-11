import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className='overflow-x-hidden bg-gradient-to-b from-cyan-200 to-cyan-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}