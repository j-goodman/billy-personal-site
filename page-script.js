window.pageData = {}

document.addEventListener('DOMContentLoaded', function () {
    let i;
    let pageElements;
    pageData.buttons = {}
    pageData.pages = {}
    pageData.buttons['home-page'] = document.getElementById('home-page-button')
    pageData.buttons['about-page'] = document.getElementById('about-page-button')
    pageData.buttons['arts-journalism-page'] = document.getElementById('arts-journalism-page-button')
    pageData.buttons['scripts-and-screenplays-page'] = document.getElementById('scripts-and-screenplays-page-button')
    pageData.buttons['podcast-page'] = document.getElementById('podcast-page-button')
    pageData.buttons['awards-and-press-page'] = document.getElementById('awards-and-press-page-button')
    pageData.buttons['contact-page'] = document.getElementById('contact-page-button')
    pageElements = document.getElementsByClassName('page')
    for (i = 0; i < pageElements.length; i++) {
        pageData.pages[pageElements[i].id] = pageElements[i]
    }
    for (buttonName in pageData.buttons) {
        pageData.buttons[buttonName].addEventListener('click', buttonClick.bind(null, [buttonName]))
    }
    document.getElementById('secondary-about-link').addEventListener('click', buttonClick.bind(null, ['about-page']))
    document.getElementById('secondary-contact-link').addEventListener('click', buttonClick.bind(null, ['contact-page']))
    setupArtsJournalismSection()
    document.getElementById('organize-by-outlet').addEventListener('click', setupArtsJournalismSection.bind(null, 'outlet'))
    document.getElementById('organize-by-article').addEventListener('click', setupArtsJournalismSection.bind(null, 'article'))
    document.addEventListener('scroll', () => {
        document.getElementById('homepage-box').classList.remove('invisible')
    })
}, false)

let buttonClick = (selectedPages) => {
    clearContent()
    window.scrollTo(0, 0)
    selectedPages.forEach(pageName => {
        pageData.pages[pageName].classList.remove('nondisplay')
    })
}

let clearContent = () => {
    for (pageName in pageData.pages) {
        pageData.pages[pageName].classList.add('nondisplay')
    }
}

let setupArtsJournalismSection = (organizeBy) => {
    let section = document.getElementById('arts-journalism-articles')
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    articles.sort( (a, b) => {
        if (organizeBy === 'outlet') {
            if (a.outlet < b.outlet) { return -1 }
            if (a.outlet > b.outlet) { return 1 }
            return 0
        } else {
            if (new Date (a.date) < new Date (b.date)) { return 1 }
            if (new Date (a.date) > new Date (b.date)) { return -1 }
            return 0
        }
    })
    articles.forEach(article => {
        let element = document.createElement('a')
        element.className = 'content-item'
        element.href = article.link
        let image = document.createElement('img')
        image.className = 'content-image'
        image.src = article.imageLink
        element.appendChild(image)
        let title = document.createElement('div')
        title.innerText = article.title
        title.className = 'item-title'
        element.appendChild(title)
        let outlet = document.createElement('div')
        outlet.innerText = article.outlet
        outlet.className = 'item-detail'
        element.appendChild(outlet)
        section.appendChild(element)
    })
}
