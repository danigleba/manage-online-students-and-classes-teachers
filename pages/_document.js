import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='mb-24 md:mb-0'>
      <Head />
      <body>
        <Main className="text-[#222222]"/>
        <NextScript />
      </body>
    </Html>
  )
}
