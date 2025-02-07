import React, { useState, useEffect } from "react";
import Switch, { Item } from "react-switchable-next";
import "react-switchable-next/dist/index.esm.css";
import "./App.css";

const App = () => {
  const [activeCountry, setActiveCountry] = useState(0);
  const [activeCity, setActiveCity] = useState(3);

  const countries = [
    { value: "Russia" },
    { value: "Nigeria" },
    { value: "Venezuela", disable: true },
    { value: "France" },
  ];

  const cities = [
    { value: "London" },
    { value: "Paris" },
    { value: "Lagos" },
    { value: "Caracas" },
  ];

  useEffect(() => {
    const nextActive = (active) => {
      if (active > 3) return 0;
      return countries[active].disable ? nextActive(active + 1) : active;
    };

    const interval = setInterval(() => {
      setActiveCountry((prev) => nextActive(prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [countries]);

  return (
    <div className="demo">
      <div className="quiz">
        <h1>Where is the Eiffel tower?</h1>
        Data Flow: child to parent
        <Switch name="cities" onItemChanged={(index) => setActiveCity(index)}>
          <Item disable value="0">
            London
          </Item>
          <Item value="1">Paris</Item>
          <Item value="2">Lagos</Item>
          <Item default value="3">
            Caracas
          </Item>
        </Switch>
        Data Flow parent to child:
        <Switch name="countries">
          {countries.map((country, index) => (
            <Item
              key={country.value}
              active={activeCountry === index}
              disable={country.disable}
              value={country.value}
            >
              {country.value}
            </Item>
          ))}
        </Switch>
        <Switch name="continents" disable>
          <Item value="0">Europe</Item>
          <Item value="1">Africa</Item>
          <Item default value="3">
            America
          </Item>
        </Switch>
        <p>
          {`The Eiffel tower is in ${cities[activeCity].value}, ${countries[activeCountry].value}.`}
        </p>
      </div>
    </div>
  );
};

export default App;
