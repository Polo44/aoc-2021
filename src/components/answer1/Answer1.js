import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer1 = ({
}) => {
    const [data, setData] = useState([0])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n').map(d => parseInt(d)).filter(d => !!d))
            });
    }, [])

    const countIncreased = (tab) => {
        return tab.reduce((acc = 0, value, index) => {
            if (index > 0) {
                if (value - tab[index - 1] > 0) {
                    return acc + 1
                }
            }
            return acc
        }, 0)
    }

    const result1 = countIncreased(data)

    const newData = data.map((d, i) => {
        if (i < 2 && i > data.length - 2) return null
        return data[i] + data[i+1] + data[i+2]
    }).filter(d => !!d)

    const result2 = countIncreased(newData)

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

export default Answer1;
