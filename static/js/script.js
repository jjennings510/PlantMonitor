// IP: 192.168.0.37
// To connecto to RPi:  ssh -R 52698:localhost:52698 pi@192.168.0.37
// To run: python3 server.py

var x = 0;
var temperature = 0;
var humidity = 0;
var moisture = 0;
var light = 0;
console.log("initiated variables");

var ctx = $("#temperature_chart");
var ctx2 = $('#moisture_chart');

console.log("test");
var temperature_chart = new Chart(ctx, {

    type: 'line',
    data: {
        labels: [],
        datasets : [
            {
                label: 'Temperature',
                data: [temperature],
                borderColor: [
                    '#060666',
                ],
                borderWidth: 3,
                fill: false,
                yAxisID: "temperature"
            },
            {
                label: "Light Intesity",
                data: [light],
                borderColor: [
                    "#372a73"
                ],
                fill: false,
                yAxisID: "light"
            }
        ]
    },
    
    options: {
        responsive: false,
        scales:{
            
            xAxes: [ {
                display: true,
                scaleLabel : {
                    display: true,
                    labelString: 'Time of day'
                    },
                ticks: {
                   autoSkip: true,
                   maxTicksLimit: 12
                }
                }],
            yAxes: [ {
                id: "temperature",
                display: true,
                position: 'left',
                ticks: {
                    suggestedMin: 30,
                    suggestedMax: 110
                    },
                scaleLabel : {
                    display: true,
                    labelString: 'Temperature (F)'
                    }
                },
                {
                    id: "light",
                    display: true,
                    position: 'right',
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 1000
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Light Intensity'
                    }
                }]
            }

    }

});

var moisture_chart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Humidity',
                data: [humidity],
                borderColor: [
                    '#d6c73e'
                ],
                fill: false,
                yAxisID: "humidity"
            },
            {
                label: 'Soil Moisture',
                data: [moisture],
                borderColor: [
                    '#823abc'
                ],
                fill: false,
                yAxisID: "moisture"
            }
        ]
    },
    options: {
        responsive: false,
        scales: {
            xAxes: [ {
                display: true,
                scaleLabel : {
                    display: true,
                    labelString: 'Time of day'
                    },
                ticks: {
                   autoSkip: true,
                   maxTicksLimit: 12
                }
            }],
            yAxes: [ {
                id: "humidity",
                display: true,
                position: 'left',
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                    },
                scaleLabel : {
                    display: true,
                    labelString: 'Humidity Percentage'
                    }
                },
                {
                    id: "moisture",
                    display: true,
                    position: 'right',
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Soil Moisture Percentage'
                    }
                }
            ]
        }
    }
})

var x = 0;
var temperature = 0;
var humidity = 0;

var updated_data = $.get('/update');
updated_data.done(function(results) {
    // Get results
    humidity = results.results[0];
    temperature = results.results[1];
    moisture = results.results[2];
    light = results.results[3];
    x = results.results[4];
    console.log(temperature);
    console.log(humidity);

    // Update Temp Chart
    temperature_chart.data.datasets[0].data = temperature;
    temperature_chart.data.datasets[1].data = light;
    temperature_chart.data.labels = x;
    temperature_chart.update();

    // Update Moisture Chart
    moisture_chart.data.datasets[0].data = humidity;
    moisture_chart.data.datasets[1].data = moisture;
    moisture_chart.data.labels = x;
    moisture_chart.update();

});