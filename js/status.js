// auth
var requestUser = "alirgoggles";
var requestPass = "apritisesamo";
var authLogin = "Basic " + btoa(requestUser + ":" + requestPass);

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/http://37.59.102.107:8000/server/data",
    type: 'GET',
    dataType: "json",
    timeout: 5000,
    success: serverStatusReceived,
    error: serverStatusError,
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", authLogin);
    }
});

function serverStatusReceived(data) {

    var address = data.address;
    var favorited = data.favorited;
    var hostname = data.hostname;
    var is_online = data.is_online;
    var last_check = data.last_check;
    var location = data.location;
    var map = data.map;
    var maxplayers = data.maxplayers;
    var name = data.name;
    var platform = data.platform;
    var players = data.players;
    var port = data.port;
    var rank = data.rank;
    var score = data.score;
    var uptime = data.uptime;
    var url = data.url;
    var version = data.version;
    var votes = data.votes;

    if (is_online === '1') {

        $('#alirservericon').attr('style','color: #4CAF50');

        // Assegnazioni in pagina
        $('.aliruser').text(players);
        $('.alirmaxuser').text(maxplayers);
        $('.aliraddress').text(address);
        $('.alirport').text(port);

        // Assegnazioni modale
        $('#alirservername').text(name);
        $('#alirlastcheck').text(last_check);
        $('#alirmap').text(map);
        $('#alirrank').text(rank);
        $('#arma3serverurl').attr('href', url);

        // Uptime logic
        var x = parseInt(uptime);
        var v;

        if (x = 100){
            v = "<span class='badge badge-success'> "+ uptime + "% </span>"
        }else if( x > 60){
            v = "<span class='badge badge-warning'> "+ uptime + "% </span>"
        }else{
            v = "<span class='badge badge-danger'> "+ uptime + "% </span>"
        }

        $('#appendUptime').append(v)




    }else{

        $('#alirservericon').attr('style','color: #f44336');

    }

    //console.log(data);
}

function serverStatusError() {


}
