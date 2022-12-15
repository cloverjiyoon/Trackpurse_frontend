import _ from 'lodash';

export function getAmounts(transaction, category) {
    let filteredData = transaction.filter(
        (e) => e.type === category
    )

    let amounts = filteredData.map(object => object.amount);
    console.log(amounts);
    return amounts;
}

export function getLabels(transaction, category) {
    let filteredData = transaction.filter(
        (e) => e.type === category
    )

    let times = filteredData.map(object => object.date);
    console.log(times);
    return times;
}

export function chart_Data(transaction, custom) {

    // let bg = _.map(transaction, a => a.color)
    // bg = _.uniq(bg)
    let dataValue = getAmounts(transaction, "Savings");
    const timestamp = getLabels(transaction, "Savings");
    const config = {
        type: 'line',
        data: {
            labels: timestamp,
            datasets: [{
                data: dataValue,
                // backgroundColor: bg,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hours'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    }
    console.log(config);
    return custom ?? config;

}

