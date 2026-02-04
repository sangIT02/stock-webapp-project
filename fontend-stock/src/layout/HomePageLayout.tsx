import React from 'react'
import { Header } from '../components/Header'
import { InfoStockHeader } from '../components/InfoStockHeader'
import { Outlet } from 'react-router-dom'

export const HomePageLayout = () => {
    return <>
        <Header />
        <InfoStockHeader />
        <Outlet></Outlet>
        </>

}
