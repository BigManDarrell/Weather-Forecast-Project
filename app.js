const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=e50bb53dce04a1940cc138c949829f0f";
    https.get(url, function(response) {
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            if(weatherData.cod === 200) {
                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const iconImg = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                res.write(`
                        <!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Darrell Rafa Raihan">
    <meta name="generator" content="Hugo 0.98.0">
    <title>${city} Weather Forecast</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/blog/">





    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">

    <!-- Favicons -->
    <link rel="apple-touch-icon" href="/docs/5.2/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
    <link rel="icon" href="/docs/5.2/assets/img/favicons/favicon-32x32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/docs/5.2/assets/img/favicons/favicon-16x16.png" sizes="16x16" type="image/png">
    <link rel="manifest" href="/docs/5.2/assets/img/favicons/manifest.json">
    <link rel="mask-icon" href="/docs/5.2/assets/img/favicons/safari-pinned-tab.svg" color="#712cf9">
    <link rel="icon" href="/docs/5.2/assets/img/favicons/favicon.ico">
    <meta name="theme-color" content="#712cf9">




    <!-- Custom styles for this template -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto&display=swap" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="css/styles.css" rel="stylesheet">

    <link rel="icon" href="icon/favicon.ico?v=2" type="image/x-icon">
</head>

<body>

    <div class="container py-4 container-succeed">
        <div class="p-3 mb-4 rounded-3 jumbotron-succeed">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold mb-5 succeed-text succeed-h1">${city}</h1>
                <img src="${iconImg}" alt="" class="weather-icon text-center mb-5">
                <p class="succeed-text">Today's ${city} Temperature is ${temp}°C</p>
                <p class="succeed-text">The Weather is Currently ${description}</p>
                <form action="/home" method="post">
                    <button class="btn succeed-btn" type="submit">Back to Home</button>
                </form>
            </div>
        </div>
        <p class="footer-suceedeed-p">&copy; 2022 Darrell Rafa Raihan</p>
    </div>
    

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
        crossorigin="anonymous"></script>

</body>

</html>
                        `);
            }
            else {
                res.write(`
                        <!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Darrell Rafa Raihan">
    <meta name="generator" content="Hugo 0.98.0">
    <title>City Not Found</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/blog/">





    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">

    <!-- Favicons -->
    <link rel="apple-touch-icon" href="/docs/5.2/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
    <link rel="icon" href="/docs/5.2/assets/img/favicons/favicon-32x32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/docs/5.2/assets/img/favicons/favicon-16x16.png" sizes="16x16" type="image/png">
    <link rel="manifest" href="/docs/5.2/assets/img/favicons/manifest.json">
    <link rel="mask-icon" href="/docs/5.2/assets/img/favicons/safari-pinned-tab.svg" color="#712cf9">
    <link rel="icon" href="/docs/5.2/assets/img/favicons/favicon.ico">
    <meta name="theme-color" content="#712cf9">




    <!-- Custom styles for this template -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto&display=swap" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="css/styles.css" rel="stylesheet">

    <link rel="icon" href="icon/favicon.ico?v=2" type="image/x-icon">
</head>

<body>

    <div class="container py-4 container-succeed">
        <div class="p-3 mb-4 rounded-3 jumbotron-succeed">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold mb-5 succeed-text succeed-h1">City Not Found</h1>
                <img src="images/404.png" alt="" class="fail-icon text-center mb-5">
                <p class="fail-text">Please Check The City You Typed.</p>
                <form action="/home" method="post">
                    <button class="btn fail-btn" type="submit">Try Again</button>
                </form>
            </div>
        </div>
        <p class="footer-suceedeed-p">&copy; 2022 Darrell Rafa Raihan</p>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
        crossorigin="anonymous"></script>

</body>

</html>
                        `);
            }
            res.send();
        });
    });
});

app.post("/home", function(req, res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running at port 3000");
})