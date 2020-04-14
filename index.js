const express = require("express");
const hbs = require("hbs");
const path = require("path");
const request = require("request");
const app = express();
const publicDirectory = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./views");
const partialPath = path.join(__dirname, "/views/inc");
const apiKey = "3e720fbbe89f7d55d097adaff9241aba";

hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory));
app.use(express.urlencoded());
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/current", (req, res) => {
  res.render("current");
});

app.get("/fiveDay", (req, res) => {
  res.render("fiveDay");
});

app.get("/errorPage", (req, res) => {
  res.render("errorPage");
});

app.post("/current", (req, res) => {
  console.log(req.body);

  const cityLocationCurrent = req.body.weatherCityCurrent;
  const countryCodeCurrent = req.body.weatherCountryCurrent;
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityLocationCurrent},${countryCodeCurrent}&units=metric&appid=${apiKey}`;
  console.log(currentUrl);

  request({ url: currentUrl, json: true }, (error, response) => {
    console.log(response.body);

    if (response.body.cod == "404") {
      res.render("errorPage", {
        errorMsg: "Location not found, please try again.",
      });
    } else
      res.render("current", {
        countryCurrent: response.body.sys.country,
        nameCurrent: response.body.name,
        mainCurrent: response.body.weather[0].main,
        descriptionCurrent: response.body.weather[0].description,
        tempCurrent: response.body.main.temp,
        tempMinCurrent: response.body.main.temp_min,
        tempMaxCurrent: response.body.main.temp_max,
      });
  });
});

app.post("/fiveDay", (req, res) => {
  console.log(req.body);

  const cityLocationfiveDay = req.body.weatherCityfiveDay;
  const countryCodefiveDay = req.body.weatherCountryfiveDay;
  const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityLocationfiveDay},${countryCodefiveDay}&units=metric&cnt=5&appid=${apiKey}`;

  request({ url: fiveDayUrl, json: true }, (error, response) => {
    console.log("this is the five days");
    if (response.body.cod == "404") {
      res.render("errorPage", {
        errorMsg: "Location not found, please try again.",
      });
    } else
      res.render("fiveDay", {
        countryfiveDay: response.body.city.country,
        namefiveDay: response.body.city.name,
        mainfiveDayOne: response.body.list[0].weather[0].main,
        mainfiveDayTwo: response.body.list[1].weather[0].main,
        mainfiveDayThree: response.body.list[2].weather[0].main,
        mainfiveDayFour: response.body.list[3].weather[0].main,
        mainfiveDayFive: response.body.list[4].weather[0].main,

        descriptionfiveDayOne: response.body.list[0].weather[0].description,
        descriptionfiveDayTwo: response.body.list[1].weather[0].description,
        descriptionfiveDayThree: response.body.list[2].weather[0].description,
        descriptionfiveDayFour: response.body.list[3].weather[0].description,
        descriptionfiveDayFive: response.body.list[4].weather[0].description,

        tempfiveDayOne: response.body.list[0].main.temp,
        tempfiveDayTwo: response.body.list[1].main.temp,
        tempfiveDayThree: response.body.list[2].main.temp,
        tempfiveDayFour: response.body.list[3].main.temp,
        tempfiveDayFive: response.body.list[4].main.temp,

        tempMinfiveDayOne: response.body.list[0].main.temp_min,
        tempMinfiveDayTwo: response.body.list[1].main.temp_min,
        tempMinfiveDayThree: response.body.list[2].main.temp_min,
        tempMinfiveDayFour: response.body.list[3].main.temp_min,
        tempMinfiveDayFive: response.body.list[4].main.temp_min,

        tempMaxfiveDayOne: response.body.list[0].main.temp_max,
        tempMaxfiveDayTwo: response.body.list[1].main.temp_max,
        tempMaxfiveDayThree: response.body.list[2].main.temp_max,
        tempMaxfiveDayFour: response.body.list[3].main.temp_max,
        tempMaxfiveDayFive: response.body.list[4].main.temp_max,
      });
  });
});

app.listen(5000, () => {
  console.log("Server is running on Port 5000");
});
