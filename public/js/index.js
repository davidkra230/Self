(async () => {
    // i like to call this trick "jQuery lite" even though there aren't much similatities
    window.$ = (...a) => { return document.querySelectorAll(a) }
    // TODO: do it with an api and admin panel

    /*
    
    mock data:

    {
        creations: [
        {
            title: "pdanetshenanigans",
            description: "A pdanet activation server.",
            image: {
                url: "/images/pdanetshenanigans.png",
                    width: 1113,
                    height: 626
                },
                links: [
                    {
                        name: "Github",
                        url: "https://github.com/davidkra230/pdanetshenanigans"
                    }
                ]
            }
        ]
    }
    
       
    */

    // warn small-screen mobile device users
    if (/Mobi/i.test(window.navigator.userAgent)) {
        alert('Your screen resolution may be too small, the website may not fit.\nYou\'ve been lightly warned.')
    }

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

    // pages..
    totalPages = Math.floor((numCreations / 4) + (1 - 1e-15))


    // rendering time
    window.renderPage = () => {
        pageText.innerHTML = `Page ${currentPage}/${totalPages}`

        var renderedHTML = ''
        for (var renderStep = (currentPage - 1) * 4; renderStep < ((currentPage - 1) * 4) + 4; renderStep++) {
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
    nextButton.onclick = ()=>{
        if (currentPage+1 > totalPages) {
            return
        }
        currentPage += 1
        renderPage()
    }

    lastButton.onclick = ()=>{
        if (currentPage-1 < 0) {
            return
        }
        currentPage -= 1
        renderPage()
    }

})()