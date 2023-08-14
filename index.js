const express = require("express")
const app = express()

const PORT = process.env.PORT || 80

app.use(express.static('public'))

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get(`/api/v1/getprojects`, (req, res) => {
  // TODO: admin panel
  res.json({
    creations: [
      {
        title: "pdanetshenanigans",
        description: "A pdanet activation server.",
        image: {
          url: "/images/pdanetshenanigans.png"
        },
        links: [
          {
            name: "Github",
            url: "https://github.com/davidkra230/pdanetshenanigans"
          }
        ]
      }
    ]
  })
})

app.get(`*`, (req, res) => {
  res.sendFile(__dirname + '/404.html')
})

app.listen(PORT, () => {
  console.log("listening on port " + PORT)
})