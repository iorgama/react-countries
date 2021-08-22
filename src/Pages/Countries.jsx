import React, { useState } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import TextInput from '../components/TextInput';
import Card from '../components/Card';
import { allCountries } from '../data/countries';
import ItemCard from '../components/ItemCard';

export default function Countries() {
  const [country, setCountry] = useState('');
  const [visitedCountries, setVisitedCountries] = useState([]);

  const handleCountryChange = (newCountry) => {
    setCountry(newCountry.trim());
  };

  const toggleVisitedCountry = (countryId) => {
    let newVisitedCountries = [...visitedCountries];
    const isCountryPresent = newVisitedCountries.indexOf(countryId) !== -1;

    if (isCountryPresent) {
      newVisitedCountries = newVisitedCountries.filter(
        (country) => country !== countryId,
      );
    }

    if (!isCountryPresent) {
      newVisitedCountries.push(countryId);
    }

    setVisitedCountries(newVisitedCountries);
  };

  const filteredCountries =
    country.length >= 3
      ? allCountries.filter(({ nameLowerCase }) =>
          nameLowerCase.includes(country.toLocaleLowerCase()),
        )
      : allCountries;

  return (
    <div>
      <Header>Countries</Header>
      <Main>
        <TextInput
          id="inputCountryFilter"
          labelDescription="Informe o nome do país (pelo menos 3 caracteres):"
          inputValue={country}
          onInputChange={handleCountryChange}
          autoFocus
        />
        <Card>
          <h2 className="text-center font-semibold">
            {filteredCountries.length} país(es)
          </h2>
          <h3 className="text-center font-semibold text-sm">
            {visitedCountries.length} país(es) visitados
          </h3>
          {filteredCountries.map((country) => {
            const isVisited = visitedCountries.indexOf(country.id) !== -1;

            return (
              <ItemCard
                isVisited={isVisited}
                onCountryClick={toggleVisitedCountry}
                key={country.id}
              >
                {country}
              </ItemCard>
            );
          })}
        </Card>
      </Main>
    </div>
  );
}
