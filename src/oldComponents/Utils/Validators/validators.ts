import React from 'react'


export const required = (value: string) => {
    if (value) {
        return undefined
    } else {
        return 'Field is required'
    }
}


export const maxLengthCreator = (maxLength:number) =>(value: string)=> {
    if (value && value.length > maxLength) {
        return `Field length cannot be more than ${maxLength} symbols`
    } else {
        return undefined
    }
}