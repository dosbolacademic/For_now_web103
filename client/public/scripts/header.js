// Находим тег <header> в index.html
const header = document.querySelector('header')

// Создаём контейнер для всего содержимого шапки
const headerContainer = document.createElement('div')
headerContainer.className = 'header-container'

// Создаём левую часть шапки

const headerLeft = document.createElement('div')
headerLeft.className = "header-left"



// Создаём элемент <img> для логотипа
const logo = document.createElement('img')
logo.src = 'logo.png'   // файл должен быть в папке client/public
logo.alt = 'Unearthed Logo'

// Добавляем логотип в левый блок
headerLeft.appendChild(logo)

// Добавляем левый блок в контейнер
headerContainer.appendChild(headerLeft)

// Добавляем контейнер в сам header
header.appendChild(headerContainer)





// Добавляем всё в header
headerContainer.appendChild(headerLeft)
header.appendChild(headerContainer)


