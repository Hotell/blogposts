const resolveColorTheme = (color: 'primary' | 'secondary' | 'accent' | 'default') => {
  const btnThemes = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    default: 'btn-default',
  }

  return btnThemes[color]
}
