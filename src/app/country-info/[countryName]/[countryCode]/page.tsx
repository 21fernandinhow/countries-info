"use client"

import CountryItem from '@/components/CountryItem';
import PopulationChart from '@/components/PopulationChart';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    const { countryName, countryCode } = useParams();
    const [countryData, setCountryData] = useState<CountryData | null>(null);
    const [error, setError] = useState("");

    const getCountryData = async () => {
        if (countryName && countryCode) {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/countryInfo/${countryCode}&${countryName}`;
            await axios.get(`${new URL(apiUrl)}`)
                .then(res => setCountryData(res.data))
                .catch(err => setError("Error trying to get country information: " + err))
        }
    };

    useEffect(() => {
        getCountryData();
    }, []); 

    return (
        <div className='min-h-screen flex flex-col gap-6 p-4'>
            {countryData ? (
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
                        <p>This country has borders with these other countries:</p>
                        <div className="flex flex-wrap justify-center gap-2 p-2">
                            {countryData.borders?.map((country) => (
                                <CountryItem countryCode={country.countryCode} countryName={country.commonName} key={country.countryCode} />
                            ))}
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
            ) : (
                <div className='container mx-auto flex items-center justify-center h-screen'>
                    {error ? (
                        <h2 className='text-center text-red-400 font-bold'>{error}</h2>
                    ) : (
                        <Loader />
                    )}
                </div>
            )}
        </div>
    );
};

export default CountryInfoPage;
