//key:  j4zOhUA5DGQuKFAfRFjTy3r5QKqrxvOL3TD14m0I
//API website: https://api.nasa.gov/api.html#authentication

//link for a photo: https://epic.gsfc.nasa.gov/archive/natural/2015/10/31/png/epic_1b_20151031074844.png

$(document).ready(function(){

    //other page is does not show when website loads
    $("#otherPage").css("display","none");

    $("#asteroidPage").css("display","none");

    //when "photoOfTheDayButton" is clicked
    $("#photoOfTheDayButton").on("click",function(){

        $.ajax({
            url: "https://api.nasa.gov/planetary/apod?api_key=j4zOhUA5DGQuKFAfRFjTy3r5QKqrxvOL3TD14m0I",
            // url: "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=j4zOhUA5DGQuKFAfRFjTy3r5QKqrxvOL3TD14m0I",
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function(result) {
                console.log(result);
                displayPOD(result);
            },
            error: function() { alert('Failed!'); }
        });


    });

    //when "asteroidPageButton" is clicked
    $("#asteroidPageButton").on("click", function () {
        asteroidInput();
    });

    //when "findAsteroidsButton" is clicked
    $("#findAsteroidsButton").on("click",function(){

        var date=$("#asteroidInput").val();

        $.ajax({
            url: "https://api.nasa.gov/neo/rest/v1/feed?start_date="+date+"&api_key=j4zOhUA5DGQuKFAfRFjTy3r5QKqrxvOL3TD14m0I",
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function(result) {
                console.log(result);
                displayAsteroids(result);

            },
            error: function() { alert('Failed!'); }
        });

    });

    //when "earthPageButton" is clicked
    $("#earthPageButton").on("click",function(){

        $.ajax({
            url: "https://api.nasa.gov/EPIC/api/natural/date/2018-03-03?api_key=j4zOhUA5DGQuKFAfRFjTy3r5QKqrxvOL3TD14m0I",
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function(result) {
                console.log(result);
                // displayAsteroids(result);

            },
            error: function() { alert('Failed!'); }
        });

    });

    //when "homeButton" is clicked
    $("#homeButton").on("click",function(){

        $("#homepage").css("display","inline");
        $("#otherPage").css("display","none");
        $("#PODTable").css("display","none");
        $("body").css("background-image", "url(\https://media.wired.com/photos/5980c922f7c57829f3e31566/2:1/w_2500,c_limit/NASA_Solarflare_HP.jpg\)");
        $("#asteroidPage").css("display","none");

    });

});


//function to display the title, photo, & description of the photo of the day on the click of the "photoOfTheDayButton" button
function displayPOD(result){

    $("body").css("background-image", "none");
    $("#homepage").css("display","none");
    $("#PODTable").css("display","inline");
    $("#photoOfTheDay").html("<img src="+result.hdurl+">");
    $("#PODTitle").html(result.title);
    $("#PODDescription").html(result.explanation);
    $("#otherPage").css("display","inline");

}

//function to display the asteroid input page with a date input and a button to find asteroids close to earth on that date
function asteroidInput(){

    $("body").css("background-image", "none");
    $("#homepage").css("display","none");
    $("#otherPage").css("display","inline");
    $("#asteroidPage").css("display","inline");
    $("#asteroidTable").css("display","none");

}

//function to create table with info about asteroids close to earth on the inputted date, will change when a new date is put in the "findAsteroidsButton" is clicked again
function displayAsteroids(result){

    $("#asteroidTable").html(" <tr style='font-weight: bold'>" +
        "<td>Name</td>" +
        "<td>Close Approach Date</td>" +
        "<td>Absolute Magnitude</td>" +
        "<td>Estimated Diameter (meters)</td>" +
        "<td>Miss Distance (miles)</td>" +
        "<td>Potentially Hazardous?</td>" +
        "</tr>");

    $("#asteroidTable").css("display","table");

    var date=$("#asteroidInput").val();

    for (var i=0;i<result.near_earth_objects[date].length;i++){
        $("#asteroidTable").append("<tr>" +
            "<td>"+result.near_earth_objects[date][i].name +"</td>" +
            "<td>"+result.near_earth_objects[date][i].close_approach_data[0].close_approach_date +"</td>" +
            "<td>"+result.near_earth_objects[date][i].absolute_magnitude_h +"</td>" +
            "<td>"+"Min:"+result.near_earth_objects[date][i].estimated_diameter.meters.estimated_diameter_min +"<br>"+
                "Max:"+result.near_earth_objects[date][i].estimated_diameter.meters.estimated_diameter_max+"</td>" +
            "<td>"+result.near_earth_objects[date][i].close_approach_data[0].miss_distance.miles+"</td>" +
            "<td>"+result.near_earth_objects[date][i].is_potentially_hazardous_asteroid +"</td>" +
            "</tr>");
    }

}

