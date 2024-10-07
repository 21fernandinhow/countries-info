import CountryItem from "./CountryItem";

interface CountryListProps {
    countries: { countryCode: string; name: string }[];
}

const CountryList = ({ countries }: CountryListProps) => (
    <div className="container mx-auto px-6">
        <div className="flex flex-wrap gap-4">
            {countries.map((country) => <CountryItem countryCode={country.countryCode} countryName={country.name} key={country.countryCode}/>)}
        </div>
    </div>
);


export default CountryList;
