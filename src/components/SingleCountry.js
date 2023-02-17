import React, {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom";

export default function SingleCountry() {
    const [country, setCountry] = useState([]);
    const {name} = useParams()
    const currencies = (x) =>
    Object.keys(x.currencies).map((e) => x.currencies[e].name);
    const languages = (x) =>
    Object.keys(x.languages).map((e) => x.languages[e]);
    const nativeName = (x) => 
    Object.keys(x.name.nativeName).map((e) => x.name.nativeName[e].official);
    

    useEffect(() => {
        const getSingleCountry = async() => {
            try {
                const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
                const data = await res.json()
                setCountry(data)
            } catch (error) {
                console.error(error)
            }
        }

        getSingleCountry()

    }, [name])

    useEffect(() => {
        document.title = `Countries | ${name}`
    }, [name]);

    return <>
        <section className="p-8 md:py-0 max-w-7xl mx-auto">
            {country.map((item) => (
                <div key={item.population} className="grid grid-cols-1 gap-8 md:grid-cols-3 md:place-items-center md:h-screen">

                    <article>

                        <Link to="/" className="inline-block mb-8 bg-white py-2 px-6 rounded shadow
                            text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700
                            dark:text-gray-400">
                            &larr; Back
                        </Link>

                        <img src={item.flags.svg} alt={item.name.common} />

                    </article>


                    <article className="col-start-2">

                        <h1 className="col-span-2 inline mb-8 font-bold text-gray-900 dark:text-white text-4xl lg:text-6xl">
                            {item.name.official}
                        </h1>
                                              
                        <ul className="my-4 flex flex-col items-start justify-start gap-2
                        text-slate-700 font-bold dark:text-gray-400">
                            <li>Native Name: <p className="font-thin inline">{nativeName(item)}</p></li>
                            <li>Population: <p className="font-thin inline">{item.population.toLocaleString()}</p></li>
                            <li>Region: <p className="font-thin inline">{item.region}</p></li>
                            <li>Sub Region: <p className="font-thin inline">{item.subregion}</p></li>
                            <li>Capital: <p className="font-thin inline">{item.capital[0]}</p></li>
                            
                        </ul>

                        {item.borders && (
                            <>
                                <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white">Borders:</h3>
                                <ul className="flex flex-wrap items-start justify-start gap-2">
                                    {item.borders.map((border, index) => (
                                        <li key={index} className="bg-white p-2 rounded text-xs tracking-wide 
                                        shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700">
                                            {border}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                    </article>
                    <article>
                        <ul className="my-4 flex flex-col items-start justify-start gap-2
                        text-slate-700 font-bold dark:text-gray-400">
                            <li>Top Level Domain: <p className="font-thin inline">{item.tld[0]}</p></li>
                            <li>Currencies: <p className="font-thin inline">{currencies(item)}</p></li>
                            <li>Languages: <p className="font-thin inline">{languages(item)}</p></li>
                        </ul>
                    </article>
                </div>
            ))}
        </section>
    </>;
}