export function changetheme(theme){
    var root = document.querySelector(":root")
    root.style.setProperty('--color-base',theme.colorbase)
    root.style.setProperty('--bgc-base',theme.bgcbase)
    root.style.setProperty('--color-light',theme.colorlight)
    root.style.setProperty('--color-Readed',theme.colorReaded)
    root.style.setProperty('--color-primary',theme.colorprimary)
    root.style.setProperty('--shadow-base',theme.shadowbase)
    root.style.setProperty('--color-discription',theme.colordiscription)
    root.style.setProperty('--color-hot',theme.colorhot)
    root.style.setProperty('--color-interval',theme.colorinterval)
}