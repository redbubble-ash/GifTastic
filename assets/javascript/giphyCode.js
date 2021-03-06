
$(document).ready(function () {

    var topics = ["Beijing", "Tokyo", "Chicago", "Hongkong", "Sydney", "Moscow", "London", "Seattle", "New York", "Rome", "Miami", "Oahu", "Paris"];
    var newCity = "";


    //create buttons for each city in the topics array

    for (i = 0; i < topics.length; i++) {
        // console.log(topics)

        $("#button").append("<button city=" + topics[i] + ">" + topics[i] + "</button>" + " ");

    };



    function clickCity() {

        $("#gifs-appear-here").empty();

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
                    var title = results[i].title

                    var p1 = $("<p>").text("Rating: " + rating);
                    var p2 = $("<p>").text("title: " + title);

                    var cityImage = $("<img>");
                    cityImage.attr("src", results[i].images.fixed_height_still.url);
                    cityImage.attr("data_status", "still")
                    cityImage.attr("arrayNumber", i)

                    gifDiv.prepend(cityImage);
                    gifDiv.prepend(p1);
                    gifDiv.prepend(p2);



                    $("#gifs-appear-here").prepend(gifDiv);


                };


                // when click on the gif image
                $(".city").on("click", function () {
                    // console.log("check");

                    // console.log($(this).children("img").attr("arrayNumber"));
                    var arrayNumber = $(this).children("img").attr("arrayNumber");
                    if ($(this).children("img").attr("data_status") === "still") {
                        $(this).children("img").attr("src", results[arrayNumber].images.fixed_height.url);
                        $(this).children("img").attr("data_status", "animated");
                    }
                    else {
                        $(this).children("img").attr("src", results[arrayNumber].images.fixed_height_still.url);
                        $(this).children("img").attr("data_status", "still");

                    }

                })

            });


    }


    $("#button button").on("click", clickCity);

    $("#submit").on("click", function () {

        newCity = $(".form-control").val().trim();

        if (newCity != "") {
            topics.push(newCity);
            // console.log(topics);
            $("#button").append("<button city=" + newCity + ">" + newCity + "</button>" + " ");
            $(".form-control").val(''); //clear the input box
            // clickCity();

            $("#button button[city='" + newCity + "']").on("click", clickCity); // *** remember how to select by attribute button[city="newcity"],(no space between element tag and attribute and use "''")
            console.log(newCity);
        }

    })





})