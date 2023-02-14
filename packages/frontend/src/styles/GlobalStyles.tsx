import { Global } from '@emotion/react'
import 'nprogress/nprogress.css'
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css`
  html {
    ${tw`antialiased scroll-smooth`}
  }
  body {
    ${tw`text-white bg-black`}
    ${tw`relative h-screen min-h-screen`}
  }

  #__next,
  #__next > div {
    ${tw`relative flex flex-col h-full min-h-full`}
  }

  /* Progress Bar */
  #nprogress > .bar {
    ${tw`bg-white`}
  }
  #nprogress > .spinner {
    ${tw`hidden!`}
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
