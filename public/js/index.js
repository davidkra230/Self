(async () => {
    // i like to call this trick "jQuery lite" even though there aren't much similatities
    var $ = (...a) => { return document.querySelectorAll(a) }
    // TODO: add an admin panel

    // initial variables
    var nextButton
    var lastButton
    var pageText
    var numCreations
    var currentPage = 1
    var totalPages

    // get the buttons
    nextButton = $('button')[1]
    lastButton = $('button')[0]

    // page text
    pageText = $('#pagetext')[0]

    // fetch the content
    var result = await (await fetch('/api/v1/getprojects')).json()

    // set that
    numCreations = result.creations.length

    if (numCreations <= 0) {
        alert('No content.')
        return;
    }

    // rendering time
    var renderPage = () => {
        // pages..
        totalPages = Math.floor((numCreations / (window.innerWidth / window.innerHeight > 1 ? 4 : 2)) + (1 - 1e-15))
        pageText.innerHTML = `Page ${currentPage}/${totalPages}`

        var itemsPerPage = window.innerWidth / window.innerHeight > 1 ? 4 : 2

        var renderedHTML = ''
        for (var renderStep = (currentPage - 1) * itemsPerPage; renderStep < ((currentPage - 1) * itemsPerPage) + itemsPerPage; renderStep++) {
            if (result.creations[renderStep] == null) {
                break
            }
            // console.log(renderStep)

            renderedHTML += '<div>'

            var creation = result.creations[renderStep]

            var renderedLinks = '';
            for (var linkStep = 0; linkStep < creation.links.length; linkStep++) {
                var link = creation.links[linkStep]
                renderedLinks = renderedLinks + `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a>`
            }
            renderedHTML += `<img src="${creation.image.url}" alt="preview image"><div><h3 class="horizontal-center">${creation.title}</h3><p>${creation.description}</p><div>${renderedLinks}</div></div>`
            renderedHTML += '</div>'
        }
        renderedHTML += '</div>'

        $('#stuffshowcase-contentbox')[0].innerHTML = renderedHTML

        // console.log(renderedHTML)

        // set buttons
        if (currentPage > 1) {
            lastButton.disabled = false
        } else {
            lastButton.disabled = true
        }
        if (currentPage < totalPages) {
            nextButton.disabled = false
        } else {
            nextButton.disabled = true
        }

    }

    // initial render
    renderPage()

    // make button work
    nextButton.onclick = () => {
        if (currentPage + 1 > totalPages) {
            return
        }
        currentPage += 1
        renderPage()
    }

    lastButton.onclick = () => {
        if (currentPage - 1 < 0) {
            return
        }
        currentPage -= 1
        renderPage()
    }

    // responsive page non-sense (actually i know 95% what im doing)
    var lastWidth = window.innerWidth
    var lastHeight = window.innerHeight
    var lastMobileMode = window.innerWidth / window.innerHeight > 1 ? false : true
    var change = false

    setInterval(()=>{
        var mobileMode = window.innerWidth / window.innerHeight > 1 ? false : true
        if (change == true) {
            change = false
            lastWidth = window.innerWidth
            lastHeight = window.innerHeight

            renderPage()
        } else if ((window.innerWidth / window.innerHeight > 1 ? false : true) && !(lastMobileMode == mobileMode)) {
            lastMobileMode = mobileMode
            change = true
        }
    }, 50)

})()