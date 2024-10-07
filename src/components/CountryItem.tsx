export interface CountryItemProps{
    countryCode: string
    countryName: string
}

const CountryItem = ({countryCode, countryName}: CountryItemProps) => (
    <a href={`/country-info?countryCode=${countryCode}&countryName=${countryName}`} key={countryCode}>
        <div className="btn btn-outline">
            <h2 className="text-xl font-semibold text-center">{countryName}</h2>
        </div>
    </a>
)

export default CountryItem