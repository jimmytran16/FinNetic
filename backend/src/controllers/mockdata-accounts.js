'use strict'

const labels = [
    'Discover',
    'Macys',
    'School',
    'Citizens Bank',
    'Care credit',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Balance',
        backgroundColor: ['#E55C20','#e70000','#c5c9c7','#00965e','rgb(116, 219, 191)'],
        borderColor: ['#E55C20','#e70000','#c5c9c7','#00965e','rgb(116, 219, 191)'],
        data: [322,122,344,32,122],
    }]
};

module.exports = data;