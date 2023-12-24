import React, { FC } from 'react'
import styles from "../styles/OtherInfo.module.css"
import { OtherInfoProps } from '../types'

const OtherInfo= ({ info }: OtherInfoProps) => {
    return (
        <div>
            <div className = {styles.container}>
            <p className = {styles.oi}>{info}</p>
            </div>
        </div>
    )
}

export default OtherInfo
