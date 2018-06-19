/*
*
*                                   ALIRHome
*
*                                 MIT License
*
*    Copyright (c) 2018 Andrea Zago
*
*    Permission is hereby granted, free of charge, to any person obtaining a copy
*    of this software and associated documentation files (the "Software"), to deal
*    in the Software without restriction, including without limitation the rights
*    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*    copies of the Software, and to permit persons to whom the Software is
*    furnished to do so, subject to the following conditions:
*
*    The above copyright notice and this permission notice shall be included in all
*    copies or substantial portions of the Software.
*
*    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
*    SOFTWARE.
*
*/

// auth
var requestUser = "alirgoggles";
var requestPass = "apritisesamo";
var authLogin = "Basic " + btoa(requestUser + ":" + requestPass);

$.ajax({
    url: "http://37.59.102.107:8190/server/data",
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
