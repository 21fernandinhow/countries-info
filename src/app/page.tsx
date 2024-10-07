import CountryList from "@/components/CountryList";
import HeroContainer from "@/components/HeroContainer";
import axios from "axios";
import { Loader } from "lucide-react";
import { Suspense } from "react";

const getCountries = async () => {
  const countries = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/AvailableCountries`)
    .then(res => res.data)
    .catch(err => console.error(err))

  return countries
}

const HomePage = async () => {

  const countries = await getCountries()

  return (
    <main className="min-h-screen">
      <HeroContainer>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Countries Info!</h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto">
            Find updated countries data. Just pick one:
        </p>
      </HeroContainer>
      <Suspense fallback={<Loader/>}>{countries && <CountryList countries={countries}/>}</Suspense> 
    </main>
  );
}

export default HomePage