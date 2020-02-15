const express = require('express')
const request = require('request')
const router = express.Router()
const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
let dreamTeam = []

router.get('/', function (request, response) {
    console.log("Someone has come into the server. Brace yourselves.")
    response.send("Server is up and running smoothly")
})

router.get('/teams/:teamName', function (req, res) {   
    let selecTeamId = teamToIDs[req.params.teamName]
    console.log(req.params.teamName);
    console.log(teamToIDs);
    console.log(selecTeamId);
    
    let theTeam = []
    request(`http://data.nba.net/10s/prod/v1/2018/players.json`, function(err, response){     
    let data = JSON.parse(response.body).league.standard
        
        data.forEach((d, i) => {
            if((d.teamId == selecTeamId) && (d.isActive)) {
                let player = {
                    pFirstName: d.firstName,
                    pLastName: d.lastName,
                    pJersey: d.jersey,
                    pPosition: d.pos,
                    pId: i,
                    isDream: false
                }
                theTeam.push(player)   
            }
        });  
        res.send(theTeam)
    })
})

router.put('/team/', function(req, res) {
    let data = req.query
    teamToIDs[data.teamName] = data.teamId
    res.end()
})


router.get('/dreamTeam', function (request, response) {
    response.send(dreamTeam)
})

router.post('/roster', function (request, response) {
    let dreamPlayer = request.body
    if(dreamTeam.length < 5) {
        dreamTeam.push(dreamPlayer)
    }
    response.send(dreamTeam)
})

router.delete('/roster', function (request, response) {
    let dreamPlayer = request.query
    let index = dreamTeam.findIndex(p => ((p.pFirstName == dreamPlayer.pFirstName) && (p.pLastName == dreamPlayer.pLastName)))
    let x = dreamTeam.splice(index, 1)
    response.send(dreamTeam)
        
})
    


module.exports = router
