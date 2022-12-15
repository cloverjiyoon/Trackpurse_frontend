import React from "react";
// import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import { Line } from "react-chartjs-2";
import {
  Chart, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from "chart.js";
// import Labels from "./Labels";
// import { chart_Data } from "../helper/lineHelper";
import { default as api } from "../store/apiSlice";

Chart.register(CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale);


export default function AnalysisGraph() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  console.log(data);
  let graphData0, graphData1, graphData2, graphData3;
  let processedData;

  if (isFetching) {
    graphData0 = <div>Fetching</div>;
  } else if (isSuccess) {
    processedData = data.filter(
      (e) => e.userEmail === localStorage.getItem("userEmail")
    );

    function createGraphData(category) {
      let combineddata = [];
      let finaldata = [];
      function combineData(category) {
        let filteredData = processedData.filter(
          (e) => e.type === category
        )
        // amount
        let amounts = filteredData.map(object => object.amount);
        console.log(amounts);

        // labels
        const times = filteredData.map(object => object.date);
        console.log(times);

        const combineddata = []

        for (let i = 0; i < amounts.length; i++) {
          combineddata.push({ x: times[i], y: amounts[i] })
        }

        console.log(combineddata)

        return combineddata;
      }

      if (category === 'all') {
        const savingData = combineData("Savings");
        const expenseData = combineData("Expense");
        const investmentData = combineData("Investment");
        finaldata = {
          // labels: times,
          datasets: [{
            label: "Saving Trend",
            data: savingData,
            // backgroundColor: bg,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: "Expense Trend",
            data: expenseData,
            // backgroundColor: bg,
            fill: false,
            borderColor: 'rgb(138,43,226)',
            tension: 0.1
          },
          {
            label: "Investment Trend",
            data: investmentData,
            // backgroundColor: bg,
            fill: false,
            borderColor: 'rgb(249, 199, 79)',
            tension: 0.1
          }
        ]
        }

      }
      else {
        combineddata = combineData(category)
        let chartcolor = 'rgb(75, 192, 192)';
        if (category === "Investment") {
          chartcolor = 'rgb(249, 199, 79)'
        } else if (category === "Expense") {
          chartcolor = 'rgb(138,43,226)'
        }
        finaldata = {
          // labels: times,
          datasets: [{
            label: category + " Trend",
            data: combineddata,
            // backgroundColor: bg,
            fill: false,
            borderColor: chartcolor,
            tension: 0.4
          }]
  
        }
      }

      const options = {
        plugins:{
          tooltip : {
            callbacks: {
              title: context =>{
                console.log(context[0].raw.x);
                const d = new Date(context[0].raw.x);
                const formattedDate = d.toLocaleString([], {
                  year: 'numeric',
                  month: 'short',
                  day : 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                });
                return formattedDate;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
              tooltipFormat: 'MMM DD'
            },
            adapters: {
              date: {
                locale: 'de',
                zone: 'UTC+1'
              },
            },
          },
          y: {
            beginAtZero: true
          }
        }
      }


      return [options, finaldata]

    }


    const returnedGraphData0 = createGraphData("Savings");
    const returnedGraphData1 = createGraphData("Expense");
    const returnedGraphData2 = createGraphData("Investment");
    const returnedGraphData3 = createGraphData("all");
    graphData0 = <Line options={returnedGraphData0[0]} data={returnedGraphData0[1]}></Line>;
    graphData1 = <Line options={returnedGraphData1[0]} data={returnedGraphData1[1]}></Line>;
    graphData2 = <Line options={returnedGraphData2[0]} data={returnedGraphData2[1]}></Line>;
    graphData3 = <Line options={returnedGraphData3[0]} data={returnedGraphData3[1]}></Line>;



  } else if (isError) {
    graphData0 = <div>Error</div>;
  }

  return (

    <div className="">

      <div className="item mx-7 w-3/5 ">
        <div className="chart relative my-14">
          {graphData0}
        </div>
        <div className="chart relative my-14">
          {graphData1}
        </div>
        <div className="chart relative my-14">
          {graphData2}
        </div>
        <div className="chart relative my-14">
          {graphData3}
        </div>

      </div>
    </div>
  );
}
