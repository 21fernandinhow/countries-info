export interface CountryItemProps{
    countryCode: string
    countryName: string
}

const CountryItem = ({countryCode, countryName}: CountryItemProps) => (
    <a href={`/country-info/${countryName}/${countryCode}`} key={countryCode}>
        <div className="btn btn-outline">
            <h2 className="text-xl font-semibold text-center">{countryName}</h2>
        </div>
    </a>
)

export default CountryItem