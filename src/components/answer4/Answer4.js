import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer4 = ({
}) => {
    const [data, setData] = useState([])
    const [values, setValues] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                const splittedText = text.split('\n')
                setValues(splittedText[0].split(',').map(d => parseInt(d)))

                var currentValues = []
                setData(splittedText.filter((d, i) => !!d && i !== 0).reduce((acc, value, index) => {
                    const splittedLine = value.split(' ').filter(d => !!d).map(d => parseInt(d))
                    if (index % 5 === 0) {
                        const newValues = [...currentValues, ...currentValues.map((_, colIndex) => currentValues.map(row => row[colIndex]))]
                        currentValues = [splittedLine]
                        return [ ...acc, ...newValues ]
                    } else {
                        currentValues.push(splittedLine)
                    }
                    if (index === (splittedText.filter((d, i) => !!d && i !== 0).length - 1)) {
                        const newValues = [...currentValues, ...currentValues.map((_, colIndex) => currentValues.map(row => row[colIndex]))]
                        return [ ...acc, ...newValues ]
                    }
                    return acc
                }, []))
            });
    }, [])

    useEffect(() => {
        if (data.length) {
            var workingData = [...data]
            var found = null
            values.map((value) => {
                workingData = workingData.map(line => {
                    return line.filter(l => l !== value)
                })
                const index = workingData.reduce((acc, value, index) => value.length === 0 ? index : acc, -1, 0)
                if (index > 0 && !found) {
                    const newIndex = Math.trunc(index / 10) * 10
                    const result = workingData.slice(newIndex, newIndex + 10)
                    const unmarked = result.reduce((acc, value) => acc + value.reduce((a, v) => a + v, 0), 0)
                    found = true
                    console.log({ workingData, result, index, newIndex })
                    setResult1(unmarked * value / 2)
                }
                return null
            })
        }
    }, [data])

    //  useEffect(() => {
    //     if (data.length) {
    //         var workingData = [...data]
    //         var found = null
    //         values.map((value) => {
    //             for (let index = 0; index < array.length; index++) {
    //                 const element = array[index];

    //             }
    //             workingData = workingData.reduce((acc, line) => {
    //                 const newLine = line.filter(l => l !== value)
    //                 return newLine.length === 0 ? acc : [ ...acc, line]
    //             }, [])
    //             const index = workingData.reduce((acc, value, index) => value.length === 0 ? index : acc, -1, 0)
    //             if (index > 0 && !found) {
    //                 const newIndex = Math.trunc(index / 10) * 10
    //                 const result = workingData.slice(newIndex, newIndex + 10)
    //                 const unmarked = result.reduce((acc, value) => acc + value.reduce((a, v) => a + v, 0), 0)
    //                 found = true
    //                 console.log({ workingData, result, index, newIndex })
    //                 setResult1(unmarked * value / 2)
    //             }
    //             return null
    //         })
    //     }
    // }, [data])


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

export default Answer4
