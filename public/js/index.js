(async()=>{
    // i like to call this trick "jQuery lite" even though there aren't much similatities
    window.$ = (...a) => {return document.querySelectorAll(a)}
    // TODO: do it with an api and admin panel
    
    /*
    
    mock data:

    {
        "creations": [
            {
                "title": "pdanetshenanigans",
                "description": "A pdanet activation server thing.",
                "links": [
                    {
                        "name": "Github",
                        "url": "https://github.com/davidkra230/pdanetshenanigans"
                    }
                ]
            }
        ]
    }
    
    */

    // set page numbers
    $('#pagetext')[0].innerHTML = 'Page 1/1'
/*
    // get the buttons
    var nextButton = $('button')[0]
    var lastButton = $('button')[1]

    // fetch the content
    var result = await (await fetch('/api/v1/getprojects')).json()

    // set it
    
    //$('#stuffshowcase-contentbox')[0].innerHTML = result
*/
})()