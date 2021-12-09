import React, { useEffect, useState } from "react";
import raw from './input.txt'
import { sortBy } from 'lodash'

const Answer9 = ({
}) => {
    const [data, setData] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    const [lowPoints, setLowPoints] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n').filter(d => !!d).map(t => t.split('')))
            });
    }, [])

    useEffect(() => {
        if (data.length) {
            let accLowPoints = []
            setResult1(data.reduce((acc, line, indexY) => {
                return acc + line.reduce((lineAcc, digit, indexX) => {
                    if (
                        (indexX === 0 || line[indexX - 1] > digit) &&  // left
                        (indexX === line.length - 1 || line[indexX + 1] > digit) && // right
                        (indexY === 0 || data[indexY - 1][indexX] > digit) && // up
                        (indexY === data.length - 1 || data[indexY + 1][indexX] > digit) // down
                    ) {
                        accLowPoints.push({ digit, indexX, indexY })
                        return lineAcc + parseInt(digit) + 1
                    }
                    return lineAcc
                }, 0)
            }, 0))
            setLowPoints(accLowPoints)
        }
    }, [data])

    let visited = []

    const getWeight = (indexX, indexY) => {
        if (visited.includes(`${indexX}${indexY}`) || indexX < 0 || indexX > data[0].length - 1 || indexY < 0 || indexY > data.length - 1 || data[indexY][indexX] === '9') {
            return 0
        }
        visited.push(`${indexX}${indexY}`)
        return 1 +
            ( !visited.includes(`${indexX - 1}${indexY}`) ? getWeight(indexX - 1, indexY) : 0) +
            ( !visited.includes(`${indexX + 1}${indexY}`) ? getWeight(indexX + 1, indexY) : 0) +
            ( !visited.includes(`${indexX}${indexY - 1}`) ? getWeight(indexX, indexY - 1) : 0) +
            ( !visited.includes(`${indexX}${indexY + 1}`) ? getWeight(indexX, indexY + 1) : 0)
    }

    useEffect(() => {
        if (lowPoints.length) {
            const points = sortBy(lowPoints.map(d => {
                visited = []
                return getWeight(d.indexX, d.indexY)
            }))
            setResult2(points[points.length - 3] * points[points.length - 1] * points[points.length - 2])
        }
    }, [lowPoints])

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

export default Answer9
