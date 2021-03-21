import React, { Component } from 'react';
import styles from './style.module.css';
import { Male, Female, OtherGender } from '../../../../assets/icons/common/icons';
import ColorIconCard from '../../../pageWidgets/Cards/ColorIcon';
import ColoredBar from '../../../pageWidgets/ColoredBar';
import { Loader } from '../../../common/Loader';

const ages = [
    '10-20',
    '21-30',
    '31-40',
    '41-50',
    '51-60',
    '61+'
]


const getBarInfo = (ageGroup, data, maxBarValue) => {
    const maleCount = data.genders.Male.ages[ageGroup];
    const femaleCount = data.genders.Female.ages[ageGroup];
    const otherCount = data.genders.Other.ages[ageGroup];
    const groupTotal = maleCount + femaleCount + otherCount;
    const malePercentage = groupTotal && (maleCount / groupTotal * 100);
    const femalePercentage = groupTotal && (femaleCount / groupTotal * 100);
    const otherPercentage = groupTotal && (otherCount / groupTotal * 100);
    const width = (groupTotal / maxBarValue * 100).toFixed(2) + '%';
    return {
        width,
        sections: [
            { width: malePercentage, color: 'rgb(82,169,216)' },
            { width: femalePercentage, color: 'rgb(229,242,121)' },
            { width: otherPercentage, color: 'rgb(21,202,175)' }
        ]
    }
}

class Segmentation extends Component {
    constructor(props) {
        super(props);
    }

    Segmentations = () => {
        const genders = this.props.people.genders;
        const maleTotal = genders.Male.total || 0;
        const femaleTotal = genders.Female.total || 0;
        const otherTotal = genders.Other.total || 0;
        const totalPeople = maleTotal + femaleTotal + otherTotal;
        const malePercent = totalPeople && (maleTotal / totalPeople * 100).toFixed(0) + '%';
        const femalePercent = totalPeople && (femaleTotal / totalPeople * 100).toFixed(0) + '%';
        const otherPercent = totalPeople && (otherTotal / totalPeople * 100).toFixed(0) + '%';
        const genderCardsInfo = [
            { value: malePercent, color: 'rgb(82,169,216)', label: 'Male', icon: Male },
            { value: femalePercent, color: 'rgb(229,242,121)', label: 'Female', icon: Female },
            { value: otherPercent, color: 'rgb(21,202,175)', label: 'Other', icon: OtherGender },
        ]
        const genderCards = genderCardsInfo.map((x, i) => {
            return (
                <ColorIconCard key={i} {...x} />
            )
        })
        const ageGroupsTotal = [];
        const agesSegmentation = ages.map((x) => {
            const ageGroupTotal = genders.Male.ages[x] + genders.Female.ages[x] + genders.Other.ages[x];
            ageGroupsTotal.push(ageGroupTotal);
            return totalPeople && `${ageGroupTotal} - ${(ageGroupTotal / totalPeople * 100).toFixed(2)} %`;
        })
        const maxValue = Math.max(...ageGroupsTotal);
        const bars = ages.map((x, i) => {
            const barData = getBarInfo(x, this.props.people, maxValue);
            return (
                <ColoredBar {...barData} key={i} />
            )
        })

        const rows = ages.map((x, i) => {
            return (
                <div key={i} className={styles.rowContainer}>
                    <div className={styles.ageGroup}>
                        {x}
                    </div>
                    <div className={styles.bar}>
                        {bars[i]}
                    </div>
                    <div className={styles.count}>
                        {agesSegmentation[i]}
                    </div>
                </div>
            )
        })

        return (
            <div className={styles.segmentationWrapper}>
                <div className={styles.title}>
                    Segmentation
                </div>
                <div className={styles.cardsContainer}>
                    {genderCards}
                </div>
                <div className={styles.segmentationGraph}>
                    <div className={styles.averageAge}>
                        <span className={styles.ageLabel}>
                            Average Age
                        </span>
                        <span className={styles.age}>
                            <div className={styles.ageInner}>
                                {this.props.people.averageAge || 0}
                            </div>
                        </span>
                    </div>
                    <div className={styles.tableContainer}>
                        {rows}
                    </div>
                </div>
            </div>
        )
    }
    Loader = () => {
        return (
            <div className={styles.loader}>
                <Loader/>
            </div>
        )
    }

    render() {
        const CurrComponent = this.props.people? this.Segmentations() : this.Loader()
        return CurrComponent
    }

}

export default Segmentation
