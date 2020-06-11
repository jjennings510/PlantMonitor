// IP: 192.168.0.37
// To run: python server.py

var x = 0;
var temperature = 0;
var humidity = 0;
console.log("initiated variables");

var ctx = $("#temperature_chart");
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
                yAxisID: "Temperature"
            },
            

            {
                label: 'Humidity',
                data: [humidity],
                borderColor: [
                    '#d6c73e'
                ],
                fill: false,
                yAxisID: "Humidity"
            }, 
        ]
    },
    
    options: {
        responsive: false,
        scales:{
            
            xAxes: [ {
                type: 'time',
                time: {
                    unit: 'minute'
                },
                display: true,
                scaleLabel : {
                    display: true,
                    labelString: 'Time (s)'
                    
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
                    suggestedMin: 15,
                    suggestedMax: 30
                    },
                scaleLabel : {
                    display: true,

                    labelString: 'Temperature (C)'
                    
                    }
                },
                {
                id: "humidity",
                display: true,
                position: 'right',
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                    },
                scaleLabel : {
                    display: true,

                    labelString: 'Percentage Humidity'
                    
                    }                   
                    
                    
                    }]
            }

    }

});

var x = 0;
var temperature = 0;
var humidity = 0;

var updated_data = $.get('/update');
updated_data.done(function(results) {
    temperature = results.results[0];
    humidity = results.results[1];
    x = results.results[2];
    console.log(temperature);
    console.log(humidity);
    temperature_chart.data.datasets[0].data = temperature;
    temperature_chart.data.datasets[1].data = humidity;
    temperature_chart.data.labels = x;
    temperature_chart.update();

});