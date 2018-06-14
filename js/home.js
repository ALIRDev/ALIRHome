console.log("Avvio ALIRHome, utilizzare la console solo per scopi di sviluppo, non trasmettere i propri dati personali o bancari!");

moment.locale('it');

function generateNews() {

    var serverKey = "10f9dfa58c23a1ab511fc2478672ebef";

    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://alir.eu/api/forums/topics?key=" + serverKey + "&forums=40,116,153,39,11,84,129&sortDir=desc&hidden=0",
        type: 'GET',
        dataType: "json",
        timeout: 5000
    }).done(function (data) {

        var result = data.results;
        var cutData = result.slice(0, 5);
        appendArticles(cutData);

    });

}

function requestStaffNews() {

    var serverKey = "10f9dfa58c23a1ab511fc2478672ebef";

    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://alir.eu/api/forums/topics?key=" + serverKey + "&forums=112&sortDir=desc&hidden=0",
        type: 'GET',
        dataType: "json",
        timeout: 5000
    }).done(function (data) {

        var result = data.results;
        var headingData = result.slice(0, 4);
        var slideData = result.slice(0,1);

        console.log(slideData);
        appendHeading(headingData);

    });

}

function appendHeading(data) {

    for (var i = 0; i < data.length; i++) {

        var topicTitle = data[i].title;
        var topicUrl = data[i].url;
        var views = data[i].views;
        var tags = data[i].tags[0];
        var author = data[i].firstPost.author.name;
        var authorProfileUrl = data[i].firstPost.author.profileUrl;
        var content = data[i].firstPost.content;
        var firstDate = data[i].firstPost.date;

        // https://www.alir.eu/rss/3-annunci.xml/?member_id=3634&key=01f5ac2969949545e480ece0ac98ba12

        console.log(tags);

        var date = moment(firstDate).fromNow();

        var element2 = "<div class='col-md-6'>"+
        "<div class='card-news bg-dark text-white'>"+
            "<a class='text-muted' href='" + topicUrl + "'>"+
            "<img class='card-img news-img' src='https://pacificgl.com/images/arma3_2.jpg' alt='Card image'>"+
            "<div class='card-img-overlay'>"+
                "<p class='card-title font-krona centered'>" + topicTitle + "</p>"+
            "</div>"+
            "<div class='card-footer text-muted'>"+
                    "<small class='text-muted textgray'><i class='fas fa-eye' title='Visualizzazioni'></i> " + views + " - <i class='fas fa-user' title='Autore'></i> " + author + " - <i class='fas fa-clock' title='Scritto'></i> " + date + "</small>"+ 
            "</div>"+
            "</a>"+
        "</div>"+
        "</div>";


        $('#latest-news').append(element2);

    }

    $('#loadedArea').removeAttr('hidden');
    console.log("Import annunci completato!");

}

function appendArticles(data) {

    for (var i = 0; i < data.length; i++) {

        var forum = data[i].forum.name;
        var topicTitle = data[i].title;
        var post = data[i].posts;
        var topicUrl = data[i].url;
        var views = data[i].views;
        var author = data[i].firstPost.author.name;
        var authorProfileUrl = data[i].firstPost.author.profileUrl;
        var content = data[i].firstPost.content;
        var firstDate = data[i].firstPost.date;

        var date = moment(firstDate).fromNow();

        // https://www.alir.eu/rss/1-rss-discussioni.xml/?member_id=3634&key=01f5ac2969949545e480ece0ac98ba12

        var element = "<div class='col-md-6 hvr-grow' style='overflow: hidden;'>" +
            "<div class='card flex-md-row mb-4 box-shadow h-md-250' style='overflow: hidden;'> " +
            "<div class='card-body d-flex flex-column align-items-start' style='overflow: hidden;'> " +
            "<strong class='d-inline-block mb-2 text-primary' style='font-size: small'>" + forum + "</strong> " +
            "<h3 style='font-size: x-large; white-space: nowrap; overflow: hidden; width: 370px; text-overflow: ellipsis;' class='mb-0' title='Continua a leggere...'> <a href='" + topicUrl + "' class='wstitle'>" + topicTitle + "</a></h3> " +
            "<div class='mb-1 text-muted'>Scritto " + date + " da <a title='Visualizza il profilo utente' href='" + authorProfileUrl + "'>" + author + "</a></div> " +
            "<div class='mb-1'><i title='Visualizzazioni' class='fas fa-eye'></i> " + views + " <i title='Risposte' class='fas fa-comments '></i> " + post + " </div></div> " +
            "</div>" +
            "</div>";  



        var element = "<div class='col-sm-12'>"+
        "<div class='card'>"+
                "<div class='card-header'>"+
                    "<h5>" + topicTitle + "</h5>"+
                "</div>"+
                "<div class='card-body'>"+
                    "<p class='card-text'> " + content + "</p>"+
                    "<p class='card-text'>"+
                        "<small class='text-muted'>Scritto " + date + " da <a title='Visualizza il profilo utente' href='" + authorProfileUrl + "'>" + author + "</a></small>"+
                    "</p>"
                    "<a href='#' class='card-link'><i title='Visualizzazioni' class='fas fa-eye'></i> " + views + " <i title='Risposte' class='fas fa-comments '></i> " + post + "</a>"+
                    "<a href='#' class='card-link'>Another link</a>"+
                "</div>"+
            "</div>"+
        "</div>";    

        $('#recentContent').append(element);

        // Parse context to string
        //var contentToText = content.replace(/<[^>]*>/g, '');
        //var contentParsed = contentToText.substring(0,200);

    }

    $('#loadPost').attr('hidden',true);
    console.log("Import post completato!");

}

$(document).ready(function () {
    console.log("Avvio import dati");

    setTimeout(function(){
        generateNews();
        requestStaffNews();
    },10000);

});
