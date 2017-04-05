var json;

$(document).ready(function() {

    $.getJSON("../data.json", function(j) {
        console.log(j);
        json = j;
        addPieChart("gender");
        addPieChart("device");
        addAreaChart("post");
    });


    /*
     * GENDER
     */
    $('#pie-gender').click(function(e) {
        e.preventDefault();
        addPieChart("gender");
    });

    $('#bar-gender').click(function(e) {
        e.preventDefault();
        addBarChart("gender");
    });

    $('#column-gender').click(function(e) {
        e.preventDefault();
        addColumnChart("gender");
    });

    /*
     * DEVICE
     */
    $('#pie-device').click(function(e) {
        e.preventDefault();
        addPieChart("device");
    });

    $('#bar-device').click(function(e) {
        e.preventDefault();
        addBarChart("device");
    });

    $('#column-device').click(function(e) {
        e.preventDefault();
        addColumnChart("device");
    });

    /*
     * POST
     */
    $('#column-post').click(function(e) {
        e.preventDefault();
        addColumnChart("post");
    });

    $('#area-post').click(function(e) {
        e.preventDefault();
        addAreaChart("post");
    });

});

/*
 * Pie chart
 *
 */
function addPieChart(container) {
    var data;
    var name = "Gêneros";
    if (container == "device") {
        name = "Dispositivos";
        data = getDeviceData();
    } else {
        data = getGenderData();
    }
    Highcharts.chart(container + '-container', {
        chart: {
            backgroundColor: '#f5f5f5',
            plotBackgroundColor: '#f5f5f5',
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: null
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: name,
            colorByPoint: true,
            data: data
        }]
    });

}

/*
 * Bar chart
 *
 */
function addBarChart(container) {
    var data;
    var name;
    if (container == "device") {
        data = getDeviceData();
        name = "Dispositivos";
    } else {
        data = getGenderData();
        name = "Gênero";
    }
    var titles = [];
    for (var i = 0; i < data.length; i++) {
        titles[i] = data[i][0];
    }
    Highcharts.chart(container + '-container', {
        chart: {
            backgroundColor: '#f5f5f5',
            plotBackgroundColor: '#f5f5f5',
            type: 'bar'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: titles,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: name,
            data: data
        }]
    });
}

/*
 * Area Chart
 *
 */
function addAreaChart(container) {
    var data = [];
    var titles = [];
    var post = getPostData();
    var name = "Postagens";
    for (var i = 0; i < post.length; i++) {
        titles[i] = post[i][0];
        data[i] = post[i][1];
    }
    Highcharts.chart(container + '-container', {
        chart: {
            backgroundColor: '#f5f5f5',
            plotBackgroundColor: '#f5f5f5',
            type: 'area'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: titles,
            labels: {
                formatter: function() {
                    return this.value.split(" ")[0];
                }
            }
        },
        yAxis: {
            title: {
                text: 'Postagens'
            },
            labels: {
                formatter: function() {
                    return this.value;
                }
            }
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: name,
            data: data
        }]
    });

}

function addColumnChart(container) {
    var data = [];
    var titles = [];
    var name;
    var dados;
    if (container == "post") {
        name = "Postagens";
        dados = getPostData();
    } else if (container == "device") {
        name = "Dispositivos";
        dados = getDeviceData();
    } else {
        name = "Gêneros";
        dados = getGenderData();
    }
    for (var i = 0; i < dados.length; i++) {
        titles[i] = dados[i][0];
        data[i] = dados[i][1];
    }
    Highcharts.chart(container + '-container', {
        chart: {
            backgroundColor: '#f5f5f5',
            plotBackgroundColor: '#f5f5f5',
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        xAxis: {
            categories: titles,
            crosshair: true,
            labels: {
                formatter: function() {
                    if (container == "post") {
                        return this.value.split(" ")[0];
                    } else {
                        return this.value;
                    }
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: name,
            data: data
        }]
    });
}


function getGenderData() {
    return json.talking_about.gender[1];
}

function getDeviceData() {
    return json.talking_about.device[1];
}

function getPostData() {
    return json.posts_in_time[1];
}
