import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer3 = ({
}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n').filter(d => !!d))
            });
    }, [])


    const result1 = data.map((_, colIndex) => data.map(row => row[colIndex])).filter(d => !!d[0]).map(d => {
        const ones = d.filter(v => v === '1').length
        return ones > (data.length/2) ? ['1', '0'] : ['0', '1']
    }).reduce((acc, value) => [acc[0] + value[0], acc[1] + value[1]], ['', '']).map(binary => parseInt(binary, 2)).reduce((acc, value) => acc * value)


    const untilLast = (fdata, dominantIndex, comparison) => {
        if (fdata.length <= 1) return fdata[0]

        const ones = fdata.map(d => d[dominantIndex]).filter(d => d === '1')
        const newDominant = comparison(ones.length, (fdata.length/2)) ? '1' : '0'
        const newData = fdata.filter(d => d[dominantIndex] === newDominant)

        return untilLast(newData, dominantIndex+1, comparison)
    }

    const result2 =  parseInt(untilLast(data, 0, (a,b) => a<b), 2) * parseInt(untilLast(data, 0, (a,b) => a>=b), 2)

    return (
        <div className="App">
            <div>
                { result1 }
            </div>
            {<div>
                { result2 }
            </div>}
        </div>
    );
}

export default Answer3
