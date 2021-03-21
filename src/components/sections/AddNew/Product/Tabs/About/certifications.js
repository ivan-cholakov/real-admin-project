import organic from '../../../../../../assets/img/badge/organic_1@2x.png'
import recyclable from '../../../../../../assets/img/badge/recycable-packaging@2x.png'
import local from '../../../../../../assets/img/badge/local_1@2x.png'
import almond from '../../../../../../assets/img/badge/almond-batch@2x.png'
import co2 from '../../../../../../assets/img/badge/co2_1@2x.png'
import palmOil from '../../../../../../assets/img/badge/sustainable-palm-oil@2x.png'
import greenerCosmetics from '../../../../../../assets/img/badge/greener-cosmetics@2x.png'
import circularEconomy from '../../../../../../assets/img/badge/circular-economy@2x.png'
import crueltyFree from '../../../../../../assets/img/badge/cruelty-free@2x.png'
import durable from '../../../../../../assets/img/badge/durable@2x.png'
import ecoFriendly from '../../../../../../assets/img/badge/ecologically-friendly@2x.png'
import energyEfficient from '../../../../../../assets/img/badge/energy-efficiency@2x.png'
import fairTrade from '../../../../../../assets/img/badge/fairtrade@2x.png'
import freeRange from '../../../../../../assets/img/badge/free-range@2x.png'
import recycling from '../../../../../../assets/img/badge/recycling@2x.png'
import supporting from '../../../../../../assets/img/badge/supporting-communities@2x.png'
import forestry from '../../../../../../assets/img/badge/sustainable-forestry@2x.png'
import seafood from '../../../../../../assets/img/badge/sustainable-seafood@2x.png'
import transparancy from '../../../../../../assets/img/badge/transperency-batch@2x.png'
import uk from '../../../../../../assets/img/badge/UK-batch@2x.png'
import vegan from '../../../../../../assets/img/badge/vegan@2x.png'
import vegetarian from '../../../../../../assets/img/badge/vegetarian@2x.png'


export const imageMap = {
    Organic: organic,
    'Recyclable packaging': recyclable,
    Local: local,
    'Responsibly sourced': almond,
    'Low carbon footprint': co2,
    'Sustainable Palm Oil': palmOil,
    'Kinder Cleaning': recycling,
    'Greener Cosmetics': greenerCosmetics,
    'No chemicals of concern': ecoFriendly,
    'Free from additives': freeRange,
    'Healthier options': almond,
    'Animal welfare': crueltyFree,
    'No animal testing': crueltyFree,
    'Carbon Conscious': co2,
    'Supporting Communities': supporting,
    'Eco-packaging': ecoFriendly,
    'Encouraging Reusables': circularEconomy,
    'Energy Efficient': energyEfficient,
    Recycling: recycling,
    Composting: almond,
    'UK Made': uk,
    Vegan: vegan,
    'Fair Trade': fairTrade,
    'Ecologically Friendly': ecoFriendly,
    'Circular Economy': circularEconomy,
    'Sustainable Forestry': forestry,
    Durable: durable,
    'Sustainable Seafood': seafood,
    'Free Range': freeRange,
    Vegetarian: vegetarian,
    'Cruelty Free': crueltyFree,
    'Supply Chain Visibility': transparancy
}

export default [
    {
        label: 'SUSTAINABILITY',
        value: 'SUSTAINABILITY',
        children: [
            {
                label: {
                    text: 'Organic',
                    image: imageMap['Organic']
                },
                value: 'Organic'
            },
            {
                label: {
                    text: 'Recyclable packaging',
                    image: imageMap['Recyclable packaging']
                },
                value: 'Recyclable packaging'
            },
            {
                label: {
                    text: 'Local',
                    image: imageMap['Local']
                },
                value: 'Local'
            },
            {
                label: {
                    text: 'Responsibly sourced',
                    image: imageMap['Responsibly sourced']
                },
                value: 'Responsibly sourced'
            },
            {
                label: {
                    text: 'Low carbon footprint',
                    image: imageMap['Low carbon footprint']
                },
                value: 'Low carbon footprint'
            },
            {
                label: {
                    text: 'Sustainable Palm Oil',
                    image: imageMap['Sustainable Palm Oil']
                },
                value: 'Sustainable Palm Oil'
            },
            {
                label: {
                    text: 'Kinder Cleaning',
                    image: imageMap['Kinder Cleaning']
                },
                value: 'Kinder Cleaning'
            },
            {
                label: {
                    text: 'Greener Cosmetics',
                    image: imageMap['Greener Cosmetics']
                },
                value: 'Greener Cosmetics'
            },
        ]
    },
    {
        label: 'HEALTH',
        value: 'HEALTH',
        children: [
            {
                label: {
                    text: 'No chemicals of concern',
                    image: imageMap['No chemicals of concern']
                },
                value: 'No chemicals of concern'
            },
            {
                label: {
                    text: 'Free from additives',
                    image: imageMap['Free from additives']
                },
                value: 'Free from additives'
            },
            {
                label: {
                    text: 'Healthier options',
                    image: imageMap['Healthier options']
                },
                value: 'Healthier options'
            },
        ]
    },
    {
        label: 'FAIRNESS',
        value: 'FAIRNESS',
        children: [
            {
                label: {
                    text: 'Animal welfare',
                    image: imageMap['Animal welfare']
                },
                value: 'Animal welfare'
            },
            {
                label: {
                    text: 'No animal testing',
                    image: imageMap['No animal testing']
                },
                value: 'No animal testing'
            },
        ]
    },
    {
        label: 'COGO BADGES',
        value: 'COGO BADGES',
        children: [
            {
                label: {
                    text: 'Carbon Conscious',
                    image: imageMap['Carbon Conscious']
                },
                value: 'Carbon Conscious'
            },
            {
                label: {
                    text: 'Supporting Communities',
                    image: imageMap['Supporting Communities']
                },
                value: 'Supporting Communities'
            },
            {
                label: {
                    text: 'Eco-packaging',
                    image: imageMap['Eco-packaging']
                },
                value: 'Eco-packaging'
            },
            {
                label: {
                    text: 'Encouraging Reusables',
                    image: imageMap['Encouraging Reusables']
                },
                value: 'Encouraging Reusables'
            },
            {
                label: {
                    text: 'Energy Efficient',
                    image: imageMap['Energy Efficient']
                },
                value: 'Energy Efficient'
            },
            {
                label: {
                    text: 'Recycling',
                    image: imageMap['Recycling']
                },
                value: 'Recycling'
            },
            {
                label: {
                    text: 'Composting',
                    image: imageMap['Composting']
                },
                value: 'Composting'
            },
            {
                label: {
                    text: 'UK Made',
                    image: imageMap['UK Made']
                },
                value: 'UK Made'
            },
            {
                label: {
                    text: 'Organic',
                    image: imageMap['Organic']
                },
                value: 'Organic'
            },
            {
                label: {
                    text: 'Vegan',
                    image: imageMap['Vegan']
                },
                value: 'Vegan'
            },
            {
                label: {
                    text: 'Fair Trade',
                    image: imageMap['Fair Trade']
                },
                value: 'Fair Trade'
            },
            {
                label: {
                    text: 'Ecologically Friendly',
                    image: imageMap['Ecologically Friendly']
                },
                value: 'Ecologically Friendly'
            },
            {
                label: {
                    text: 'Circular Economy',
                    image: imageMap['Circular Economy']
                },
                value: 'Circular Economy'
            },
            {
                label: {
                    text: 'Sustainable Forestry',
                    image: imageMap['Sustainable Forestry']
                },
                value: 'Sustainable Forestry'
            },
            {
                label: {
                    text: 'Durable',
                    image: imageMap['Durable']
                },
                value: 'Durable'
            },
            {
                label: {
                    text: 'Sustainable Seafood',
                    image: imageMap['Sustainable Seafood']
                },
                value: 'Sustainable Seafood'
            },
            {
                label: {
                    text: 'Free Range',
                    image: imageMap['Free Range']
                },
                value: 'Free Range'
            },
            {
                label: {
                    text: 'Vegetarian',
                    image: imageMap['Vegetarian']
                },
                value: 'Vegetarian'
            },
            {
                label: {
                    text: 'Cruelty Free',
                    image: imageMap['Cruelty Free']
                },
                value: 'Cruelty Free'
            },
            {
                label: {
                    text: 'Supply Chain Visibility',
                    image: imageMap['Supply Chain Visibility']
                },
                value: 'Supply Chain Visibility'
            },
        ]
    },
]