"use client"
import { extendTheme, UsageTheme } from "@yamada-ui/react"
import styles from './styles'
// import components from './components'
import tokens from './tokens/index'

const customTheme: UsageTheme = {
  styles,
  // components,
  ...tokens,
}

export default extendTheme(customTheme)()