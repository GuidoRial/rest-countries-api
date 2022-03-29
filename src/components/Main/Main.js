import React, { useEffect, useState } from "react";
import uniqid from "uniqid";

function Main() {
    const [searchCountry, setSearchCountry] = useState("");
    const [region, setRegion] = useState("America");
    const [countries, setCountries] = useState([]);

    console.log(countries);

    useEffect(() => {
        const fetchAmerica = async () => {
            try {
                let result = await fetch(
                    "https://restcountries.com/v3.1/region/america"
                );
                let countries = await result.json();
                await setCountries(countries);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAmerica();
    }, []);

    useEffect(() => {
        const fetchCountriesByRegion = async (region) => {
            try {
                let result = await fetch(
                    `https://restcountries.com/v3.1/region/${region}`
                );
                let countries = await result.json();
                await setCountries(countries);
            } catch (error) {
                console.error(error);
            }
        };
        if (searchCountry.length === 0) {
            fetchCountriesByRegion(region);
        }
    }, [region]);

    useEffect(() => {
        const searchCountriesByName = async (name) => {
            try {
                let result = await fetch(
                    `https://restcountries.com/v3.1/name/${name}`
                );
                let countries = await result.json();
                setCountries(countries);
            } catch (error) {
                console.error(error);
            }
        };
        if (searchCountry.length > 0) searchCountriesByName(searchCountry);
    }, [searchCountry]);

    return (
        <>
            <section className="filters">
                <input
                    type="search"
                    placeholder="Search for a country..."
                    onChange={(e) => setSearchCountry(e.target.value)}
                />
                <select onChange={(e) => setRegion(e.target.value)}>
                    <option value="america">America</option>
                    <option value="africa">Africa</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </section>
            <section>
                {countries ? (
                    countries.map((country) => (
                        <div key={uniqid()}>
                            <img src={country.flags.png} alt="country-flag" />
                            <p>{country.name.common}</p>
                            <p>Population: {country.population}</p>
                            <p>Region: {country.region}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </section>
        </>
    );
}

export default Main;
