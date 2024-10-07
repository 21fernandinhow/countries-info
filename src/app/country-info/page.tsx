"use client";

import CountryItem from '@/components/CountryItem';
import PopulationChart from '@/components/PopulationChart';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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
}

export interface PopulationData {
    year: number;
    value: number;
}

const CountryInfo = () => {
    const searchParams = useSearchParams();
    const countryName = searchParams.get('countryName');
    const countryCode = searchParams.get('countryCode');
    
    const [countryData, setCountryData] = useState<CountryData>();
    const [error, setError] = useState("");

    useEffect(() => {
        const getCountryData = async () => {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/countryInfo/${countryCode}&${countryName}`;
            try {
                const res = await axios.get(apiUrl);
                setCountryData(res.data);
            } catch (err) {
                setError("Error trying to get country information: " + err);
            }
        };

        getCountryData();
    }, [countryCode, countryName]);

    if (error) {
        return <h2 className='text-center text-red-400 font-bold'>{error}</h2>;
    }

    return (
        <div className='container mx-auto m-3'>
            {countryData ? (
                <>
                    <h2 className='text-4xl text-center font-bold'>{countryData.country}</h2>
                    <img 
                        src={countryData.flag} 
                        className="my-2 mx-auto w-full max-w-[10rem] sm:max-w-[12rem] md:max-w-[14rem] lg:max-w-[16rem] xl:max-w-[18rem] rounded-sm"
                        alt={countryData.country} 
                    />
                    
                    <div className="text-center m-3 p-4">
                        <h3 className='font-bold text-2xl'>Borders Countries</h3>
                        <p>This country has borders with these other countries:</p>
                        <div className="flex flex-wrap justify-center gap-2 p-2">
                            {countryData.borders?.map((country) => 
                                <CountryItem countryCode={country.countryCode} countryName={country.commonName} key={country.countryCode} />
                            )}
                        </div>
                    </div>

                    <div className="m-3">
                        <h3 className='font-bold text-2xl text-center'>Population Data</h3>
                        <Suspense fallback={<Loader />}>
                            {countryData.populationData.length > 0 ? (
                                <PopulationChart populationData={countryData.populationData} />
                            ) : (
                                <p>No population data available.</p>
                            )}
                        </Suspense>
                    </div>
                </>
            ) : (
                <div className='flex items-center justify-center h-screen'>
                    <Loader />
                </div>
            )}
        </div>
    );
};

const CountryInfoPage = () => (
    <Suspense fallback={<Loader />}>
        <CountryInfo />
    </Suspense>
);

export default CountryInfoPage;
