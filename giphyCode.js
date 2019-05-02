
$(document).ready(function () {

    var topics = ["Dubai", "Beijing", "Shanghai", "Hongkong", "Sydney", "Moscow", "London", "Seattle", "New York", "Rome", "Miami", "Barcelona", "Paris"];

    for (i = 0; i < topics.length; i++) {

        $("#button").append("<button city=" + topics[i] + ">" + topics[i] + "</button>" + " ");




    };

    $("#button button").on("click", function () {
        var travelCity = $(this).attr("city");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            travelCity + "&api_key=LHm5r26Y8UndONHQM4SKc1OHY96mKU8U&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");

                    gifDiv.addClass("city");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var cityImage = $("<img>");
                    cityImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(cityImage);
                    gifDiv.prepend(p);
                    
                   

                    $("#gifs-appear-here").prepend(gifDiv);
                

                };







            });





    })

})