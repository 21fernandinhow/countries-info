"use client"

import CountryItem from '@/components/CountryItem';
import PopulationChart from '@/components/PopulationChart';
import axios from 'axios'
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

interface CountryData {
    country: string;
    borders: Border[] | null;
    populationData: PopulationData[];
    flag: string;
}

interface Border {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: Border[] | null;
}

export interface PopulationData {
    year: number;
    value: number;
}

const CountryInfoPage = () => {

    const searchParams = useSearchParams()
    const countryName = searchParams.get('countryName')
    const countryCode = searchParams.get('countryCode')
    const [countryData, setCountryData] = useState<CountryData>()
    const [error, setError] = useState("")

    const getCountryData = async () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/countryInfo/${countryCode}&${countryName}`;
        axios.get(`${new URL(apiUrl)}`)
            .then(res => setCountryData(res.data))
            .catch(err => setError("Error trying to get country information:" + err))
    }

    useEffect(()=>{
        getCountryData()
    },[])
    
    return(
        <div className='min-h-screen flex flex-col gap-6 p-4'>
            <Suspense fallback={<Loader/>}>
                {countryData ?
                    <>
                        <div className='container mx-auto m-3'>
                            <h2 className='text-4xl text-center font-bold'>{countryData.country}</h2>
                            <img 
                                src={countryData.flag} 
                                className="my-2 mx-auto w-full max-w-[10rem] sm:max-w-[12rem] md:max-w-[14rem] lg:max-w-[16rem] xl:max-w-[18rem] rounded-sm"
                                alt={countryData.country} 
                            />
                        </div>

                        <div className="container mx-auto text-center m-3 p-4">
                            <h3 className='font-bold text-2xl'>Borders Countries</h3>
                            <p>This country has border with this other countries:</p>
                            <div className="flex flex-wrap justify-center gap-2 p-2">
                                {countryData.borders?.map((country) => <CountryItem countryCode={country.countryCode} countryName={country.commonName} key={country.countryCode}/>)}
                            </div>
                        </div>

                        <div className="container mx-auto m-3">
                            <h3 className='font-bold text-2xl text-center'>Population Data</h3>
                            {countryData.populationData.length > 0 ? (
                                <PopulationChart populationData={countryData.populationData} />
                            ) : (
                                <p>No population data available.</p>
                            )}
                        </div>

                    </>
                    :
                    <div className='container mx-auto flex items-center justify-center h-screen'>
                        {error ? 
                            <h2 className='text-center text-red-400 font-bold'>{error}</h2> 
                            : <Loader/>
                        }
                    </div>
                }
            </Suspense>
            
        </div>
    )
}

export default CountryInfoPage