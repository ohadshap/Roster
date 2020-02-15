let currTeam = []
let dreamTeam = []
$("#roster").on("click", function() {
    let teamName = $("input").val()
    $.get(`/teams/${teamName}`, function(theTeam){
        renderTeam(theTeam)
        currTeam = theTeam
    })
})

$("#content").on("click", "#notDreamTm", function() {
    let playerId = $(this).closest(".card").data().id
    let player = currTeam.find(p => (p.pId == playerId))
    if(!player.isDream){
        player.isDream = true
        addToDreamTeam(player)
    }
    renderTeam(currTeam)
})

$("#content").on("click", "#isDreamTm", function() {
    let playerId = $(this).closest(".card").data().id
    let player = currTeam.find(p => (p.pId == playerId))
    player.isDream = false
    removeFromDreamTeam(player)
    renderTeam(currTeam)
})

$("#showDream").on("click", function() {
    $.get('/dreamTeam', function(dreamTeam) {
        currTeam = dreamTeam
        renderTeam(currTeam)
    })
})

const addToDreamTeam = function(dreamPlayer) {
    $.post(`/roster`, dreamPlayer)
}

const removeFromDreamTeam = function(dreamPlayer) {
    $.ajax({
        method: "DELETE",
        url: `/roster`,
        success: dreamPlayer
      });
      let index = dreamTeam.findIndex(p => p == dreamPlayer)
      dreamTeam.splice(index, 1)
}

const renderTeam = function (theTeam) {
    $('#content').empty()
    const source = $('#img-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template({team: theTeam});
    $('#content').append(newHTML);
}
