window.pageData = {}

document.addEventListener('DOMContentLoaded', function () {
    let i;
    let pageElements;
    pageData.buttons = {}
    pageData.pages = {}
    pageData.buttons['home-page'] = [
        document.getElementById('home-page-button'),
        document.getElementById('mobile-home-page-button')
    ]
    pageData.buttons['about-page'] = [
        document.getElementById('about-page-button'),
        document.getElementById('mobile-about-page-button')
    ]
    pageData.buttons['arts-journalism-page'] = [
        document.getElementById('arts-journalism-page-button'),
        document.getElementById('mobile-arts-journalism-page-button')
    ]
    pageData.buttons['scripts-and-screenplays-page'] = [
        document.getElementById('scripts-and-screenplays-page-button'),
        document.getElementById('mobile-scripts-and-screenplays-page-button')
    ]
    pageData.buttons['podcast-page'] = [
        document.getElementById('podcast-page-button'),
        document.getElementById('mobile-podcast-page-button')
    ]
    pageData.buttons['awards-and-press-page'] = [
        document.getElementById('awards-and-press-page-button'),
        document.getElementById('mobile-awards-and-press-page-button')
    ]
    pageData.buttons['contact-page'] = [
        document.getElementById('contact-page-button'),
        document.getElementById('mobile-contact-page-button')
    ]
    pageElements = document.getElementsByClassName('page')
    for (i = 0; i < pageElements.length; i++) {
        pageData.pages[pageElements[i].id] = pageElements[i]
    }
    for (buttonName in pageData.buttons) {
        pageData.buttons[buttonName].forEach(buttonElement => {
            buttonElement.addEventListener('click', buttonClick.bind(null, [buttonName], (buttonElement.id.includes('mobile'))))
        })
    }
    document.getElementById('secondary-about-link').addEventListener('click', buttonClick.bind(null, ['about-page']))
    document.getElementById('secondary-contact-link').addEventListener('click', buttonClick.bind(null, ['contact-page']))
    setupArtsJournalismSection('article')
    document.getElementById('organize-by-outlet').addEventListener('click', setupArtsJournalismSection.bind(null, 'outlet'))
    document.getElementById('organize-by-article').addEventListener('click', setupArtsJournalismSection.bind(null, 'article'))
    document.addEventListener('scroll', () => {
        document.getElementById('homepage-box').classList.remove('invisible')
    })
    document.getElementById('mobile-list-expander').addEventListener('click', () => {
        let element = document.getElementById('mobile-page-list')
        if (element.className.includes('closed')) {
            element.classList.remove('closed')
        } else {
            element.classList.add('closed')
        }
    })
}, false)

let buttonClick = (selectedPages, mobile) => {
    clearContent()
    if (mobile) {
        document.getElementById('mobile-page-list').classList.add('closed')
    }
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
    let newTab = document.getElementById(`organize-by-${organizeBy}`)
    let oldTab = document.getElementById(`organize-by-${
        organizeBy === 'article' ? 'outlet' : 'article'
    }`)
    newTab.classList.add('selected-tab')
    oldTab.classList.remove('selected-tab')
    let section = document.getElementById('arts-journalism-articles')
    let subsection;
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    if (organizeBy === 'article') {
        let categories = {}
        articles.forEach(article => {
            if (!categories[article.category]) {
                categories[article.category] = []
            }
            categories[article.category].push(article)
        })
        Object.keys(categories).forEach(categoryName => {
            subsection = document.createElement('div')
            subsection.className = 'page-content wrap-list'
            let header = document.createElement('div')
            header.className = 'category-header'
            header.innerText = categoryName
            section.appendChild(header)
            section.appendChild(subsection)
            categories[categoryName].forEach(article => {
                let element = document.createElement('a')
                element.className = 'content-item'
                element.href = article.link
                let image = document.createElement('img')
                image.className = 'content-image'
                if (article.imageAlign) {
                    image.classList.add(`${article.imageAlign}-align-content-image`)
                }
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
                subsection.appendChild(element)
            })
        })
    } else {
        Object.keys(outletLogos).forEach(outlet => {
            let element = document.createElement('a')
            element.href = outletFeaturedArticles[outlet]
            element.target = "_blank"
            element.className = 'brand-logo'
            let image = document.createElement('img')
            element.appendChild(image)
            image.src = `images/brand_logos/${outletLogos[outlet]}`
            section.appendChild(element)
            console.log(section)
        })
    }
}
