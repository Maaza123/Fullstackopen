import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SearchBar = ({value, handlechange, handleButtonClick}) => {
    return(
        <div>
            find countries: <input value={value} onChange={handlechange} />
        </div>
    )
}
const CountryStatus = ({countries, handleButtonClick, weatherInfo, setWeatherInfo}) => {
    if(countries.length > 10){
        return(
            <p>Too many countries, specify another filter</p>
        )
    }else if(countries.length >1 && countries.length < 11){
        return(
            <CountryList countries={countries} onClick={handleButtonClick}/>
        )
    }else if(countries.length === 1){
        return(
            <div>
                <CountryInfo country={countries[0]} weatherInfo={weatherInfo} setWeatherInfo={setWeatherInfo}/>
            </div>
        )
    }else{
        return(
            <p>
                No matches
            </p>
        )
    }
}
const CountryInfo = ({country, weatherInfo, setWeatherInfo}) => {
    useEffect(()=> {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.name}`)
            .then(response =>{
                console.log(response.data);
                setWeatherInfo(response.data.location);
            })
            .catch(error => {
                setWeatherInfo()
            })
    },[])
    return(
        <div>
            <div>
                <h1>
                    {country.name}
                </h1>

                <p>
                    capital {country.capital}
                </p>
                <p>
                    population {country.population}
                </p>
            </div>
            <div>
                <h2>
                    languages
                </h2>
                {country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>)}
                
                <div>
                    <img src={country.flag} width='20%' height='20%' border='1px solid' alt=''/>
                </div>
                <h2>Weather in {weatherInfo.name}</h2>  
            </div>
            

        </div>
    )
}
const CountryList = ({countries, onClick}) => {
    return(
        <div>
            {countries.map(country =>
                <p key={country.name}>
                    {country.name} <button type='button' value={country.name} onClick={onClick}>show</button>
                </p>)}
        </div>
    )
}
const apiKey = process.env.WEATHER_API_KEY;

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [weatherInfo, setWeatherInfo] =useState({
        name: ''
    });

    const handleSearchBarChange = (event) => {
        setSearchValue(event.target.value);
    }
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log(response);
                setCountries(response.data);
        });
    }, []);
    const handleButtonClick = (event) => {
        setSearchValue(event.target.value);
    }
    
            
    
    const filteredCountries = (() => {
        let countryList = [];
        countries.forEach(country => {
            if(country.name.toLowerCase().includes(searchValue.toLowerCase())){
                countryList.push(country);
            }
        })
        return(countryList);
    })();

    return(
        <div>
            <SearchBar value={searchValue} handlechange={handleSearchBarChange} />
            <CountryStatus countries={filteredCountries} handleButtonClick={handleButtonClick} setWeatherInfo={setWeatherInfo} weatherInfo={weatherInfo}/>
        </div>
    )
}
export default App;
