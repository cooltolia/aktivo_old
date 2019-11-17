(function() {
  var profitData = [2500, 1700, 1200, 1600, 1250, 650];
  var dividendsData = [5, 10, 20, 30, 20, 15];
  var dividendsMax = 35;
  var profitMax = 2500;

  var chart = $("#income-monitoring");

  if (chart.length) {
    Highcharts.chart("income-monitoring", {
      chart: {
        zoomType: "xy"
      },
      title: {
        text: ""
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        line: {
          dataLabels: {
            align: "center",
            enabled: true,
            color: "black",
            padding: 10,
            style: {
              textOutline: "none",
              fontSize: "14px",
              fontWeight: "400"
            },
            formatter: function() {
              return this.y + "%";
            }
          }
        }
      },
      xAxis: [
        {
          categories: [
            "Фев 18",
            "Мар 18",
            "Апр 18",
            "Май 18",
            "Июн 18",
            "Июл 18"
          ],
          crosshair: false,
          labels: {
            style: {
              color: "rgba(0, 0, 0, 0.4)",
              fontSize: "9px"
            }
          }
        }
      ],
      yAxis: [
        {
          visible: false,
          min: 0,
          max: dividendsMax
        },
        {
          max: profitMax,
          title: {
            text: ""
          },
          labels: {
            style: {
              color: "rgba(0, 0, 0, 0.4)",
              fontSize: "9px"
            }
          }
        }
      ],
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: "Сумма выплат",
          type: "column",
          yAxis: 1,
          data: profitData,
          color: "#3c7bd8",
          tooltip: {
            valueSuffix: " 000 руб"
          }
        },
        {
          name: "Доходность",
          type: "line",
          data: dividendsData,
          color: "#ffd729",
          tooltip: {
            valueSuffix: "%"
          }
        }
      ]
    });
  }

  var timeline = $("#timelinechart");
  if (timeline.length) {
    setTimeout(() => {
      var scrolledArea = timeline.find(".highcharts-scrolling");
      if (scrolledArea.length === 0) return
      new SimpleBar(scrolledArea[0], {
        autoHide: false
      });
    }, 1000);

    var timelineData = [
      {
        name: "First dogs",
        label: "1951: First dogs in space",
        description: "22 July 1951 First dogs in space (Dezik and Tsygan) "
      },
      {
        name: "Sputnik 1",
        label: "1957: First artificial satellite",
        description:
          "4 October 1957 First artificial satellite. First signals from space."
      },
      {
        name: "First human spaceflight",
        label: "1961: First human spaceflight (Yuri Gagarin)",
        description:
          "First human spaceflight (Yuri Gagarin), and the first human-crewed orbital flight"
      },
      {
        name: "First human on the Moon",
        label: "1969: First human on the Moon",
        description:
          "First human on the Moon, and first space launch from a celestial body other than the Earth. First sample return from the Moon"
      },
      {
        name: "First space station",
        label: "1971: First space station",
        description:
          "Salyut 1 was the first space station of any kind, launched into low Earth orbit by the Soviet Union on April 19, 1971."
      },
      {
        name: "Apollo–Soyuz Test Project",
        label: "1975: First multinational manned mission",
        description:
          "The mission included both joint and separate scientific experiments, and provided useful engineering experience for future joint US–Russian space flights, such as the Shuttle–Mir Program and the International Space Station."
      }
    ];
    var changeColorStep = 100 / timelineData.length;
    var startTimelineColor = "#3c7bd8";
    var timelineColors = [startTimelineColor];
    for (var i = 1; i < timelineData.length; i++) {
        timelineColors.push(shadeColor(timelineColors[i-1], -changeColorStep));
    }

    var columnWidth = 120;
    var chartMinWidth = columnWidth * timelineData.length;
    console.log(chartMinWidth);

    var startColor = Highcharts.chart("timelinechart", {
      chart: {
        type: "timeline",
        scrollablePlotArea: {
          minWidth: chartMinWidth
        }
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      title: "none",
      colors: timelineColors,
      credits: {
        enabled: false
      },
      series: [
        {
          data: timelineData
        }
      ]
    });
  }
  
  /** just a helper function to calc color for timeline */
  function shadeColor(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }
})();
