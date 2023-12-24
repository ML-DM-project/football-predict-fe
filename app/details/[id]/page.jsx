import React from 'react'
import PredictChart from '@/components/PredictChart'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import LineUp from './LineUp'
import Statistics from './Statistics'
import PredictButton from './PredictButton'


const page = ({ params }) => {
    return (
        <>
            <Header />
            <PredictButton id={params.id}/>
            <div className=''>
                <LineUp id={params.id} />
                <Statistics id={params.id}/>
            </div>
           
            <Footer />

            
        </>
    )
}

export default page