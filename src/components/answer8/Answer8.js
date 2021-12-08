import React, { useEffect, useState } from "react";
import raw from './input.txt'
import { sortBy } from 'lodash'

const Answer8 = ({
}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n').filter(d => !!d).map(t => t.split(' | ')).map(line => line.map(l => l.split(' '))))
            });
    }, [])

    const result1 = data.length ? data.map(d => d[1]).map((digits) => {
        return digits.reduce((acc, digit) => {
            switch (digit.length) {
                case 2:
                case 3:
                case 4:
                case 7:
                    return acc + 1
                default:
                    return acc
            }
        }, 0)
    }).reduce((acc, value) => acc + value) : 0


    const intersect = (search, select) => {
        const filteredStrings = { search, select }
        return (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('').length
    }

    const whoIsWho = (code, digits) => {
        const sortedCode = sortBy(code, d => d.length).map(text => text.split('').sort().join(''))
        const decoded = sortedCode.reduce((acc, value) => {
            switch (value.length) {
                case 2:
                    return { ...acc, [value]: 1, '1': value }
                case 3:
                    return { ...acc, [value]: 7}
                case 4:
                    return { ...acc, [value]: 4, '4': value }
                case 5:
                    if (intersect(value, acc['1']) === 2) {
                        return { ...acc, [value]: 3 }
                    } else if (intersect(value, acc['4']) === 2) {
                        return { ...acc, [value]: 2 }
                    }
                    return { ...acc, [value]: 5 }
                case 6:
                    if (intersect(value, acc['1']) === 1) {
                        return { ...acc, [value]: 6 }
                    } else if (intersect(value, acc['4']) === 4) {
                        return { ...acc, [value]: 9 }
                    }
                    return { ...acc, [value]: 0 }
                case 7:
                    return { ...acc, [value]: 8 }
                default:
                    return acc
            }
        }, {})

        return digits.map(text => text.split('').sort().join('')).reduce((acc, value) => acc + decoded[value], '')
    }

    const result2 = data.length ? data.map(d => whoIsWho(d[0], d[1])).map(d => parseInt(d)).reduce((acc, value) => acc + value) : 0

    return (
        <div className="App">
            <div>
                { result1 }
            </div>
            <div>
                { result2 }
            </div>
        </div>
    );
}

export default Answer8
