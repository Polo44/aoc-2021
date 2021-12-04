import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer2 = ({
}) => {
    const [data, setData] = useState([0])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n').map(d => d.split(' ')).filter(d => !!d[1]))
            });
    }, [])

    const result1 = data.reduce((acc, value) => {
        const distance = parseInt(value[1])
        switch (value[0]) {
            case 'forward':
                return [acc[0] += distance, acc[1]]
            case 'down':
                return [acc[0], acc[1] += distance]
            case 'up':
            default:
                return [acc[0], acc[1] -= distance]
        }
    }, [0, 0]).reduce((acc, value) => acc * value)

    const result2 =  data.reduce((acc, value) => {
        const distance = parseInt(value[1])
        const aim = parseInt(acc[2])
        switch (value[0]) {
            case 'forward':
                return [acc[0] += distance, acc[1] += (distance*aim), acc[2]]
            case 'down':
                return [acc[0], acc[1], acc[2] += distance]
            case 'up':
            default:
                return [acc[0], acc[1], acc[2] -= distance]
        }
    }, [0, 0, 0])

    return (
        <div className="App">
            <div>
                { result1 }
            </div>
            <div>
                { result2[0] * result2[1] }
            </div>
        </div>
    );
}

export default Answer2;
