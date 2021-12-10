import React, { useEffect, useState } from "react";
import raw from './input.txt'
import { sortBy } from 'lodash'

const Answer10 = ({
}) => {
    const [data, setData] = useState([])
    const closingChnk = [')', ']', '}', '>']
    const correspondingChnk = {
        ')': '(',
        ']': '[',
        '}': '{',
        '>': '<',
    }
    const closingValues = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    }
    const closingValues2 = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4,
    }

    const [lowPoints, setLowPoints] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n').filter(d => !!d))
            });
    }, [])

    const result = data.length && data.map(line => {
        const lineChunk = line.split('').reduce((acc, chunk) => {
            if (acc.error > 0) return acc
            const chunks = acc.chunks
            if (closingChnk.includes(chunk)) {
                if (chunks[chunks.length - 1] === correspondingChnk[chunk]) {
                    return  { ...acc, chunks: chunks.filter((_, i) => i !== chunks.length - 1) }
                }
                return { error: closingValues[chunk] }
            }
            return { ...acc, chunks: [...chunks, chunk] }
        }, { error: 0, chunks: [] })
        if (lineChunk.error > 0 || lineChunk.chunks.length === 0) {
            return { error: lineChunk.error, remaining: 0 }
        }
        return {
            error: 0, remaining: lineChunk.chunks.reverse().reduce((acc, chunk) => acc * 5 + closingValues2[chunk], 0)
        }
    }) || []

    const remainings = sortBy(result.filter(d => d.remaining).map(d => d.remaining))

    return (
        <div className="App">
            <div>
                { result.length && result.reduce((acc, value) => acc + value.error, 0) }
            </div>
            <div>
                { remainings[Math.round(remainings.length/2) - 1] }
            </div>
        </div>
    );
}

export default Answer10
