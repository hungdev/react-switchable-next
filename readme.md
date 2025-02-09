# react-switchable-next

## Note

> This is forked from [react-switchable](https://github.com/AlvaroBernalG/?react-switchable) with some changes to make it work with react 18 and convert it to function component.

## Install

```bash
npm install react-switchable-next --save
```

## Usage

```jsx
import Switch, { Item } from "react-switchable-next";
import "react-switchable-next/dist/index.esm.css";

<Switch
  name="temperature"
  onItemChanged={(newValue) => console.log("The new value is => ", newValue)}
>
  <Item value="Hot">Hot</Item>
  <Item value="Cold">Cold</Item>
</Switch>;
```

You can have as many Item children as you can fit:

```jsx
import Switch, { Item } from "react-switchable-next";
import "react-switchable-next/dist/index.esm.css";

<div>
  <h1>What is the capital of Venezuela ?</h1>
  <Switch name="countries" onItemChanged={(capital) => checkAnswer(capital)}>
    <Item value="London">London</Item>
    <Item value="Caracas">Caracas</Item>
    <Item value="Lagos">Lagos</Item>
    <Item value="Beijing">Beijing</Item>
    <Item value="Moscow">Moscow</Item>
  </Switch>
</div>;
```

## Data flow

By default the switchable component manages which `<Item />` is active internally. You can change that by setting the `active` attribute in any `<Item />` component.

Data flow from parent to child :

```js
import React, { useState } from "react";

const App = () => {
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(1);
  const countries = [
    { value: "Russia" },
    { value: "Nigeria" },
    { value: "Venezuela" },
    { value: "France" },
  ];

  return (
    <Switch
      name="countries"
      onItemSelected={(selectedIndex) => setSelectedCountryIndex(selectedIndex)}
    >
      {countries.map((country, index) => (
        <Item key={country.value} active={index === selectedCountryIndex} value={country.value}>
          {country.value}
        </Item>
      ))}
    </Switch>
  );
};

export default App;
```

Data flow from child to parent:

```js
import React, { useState } from "react";
import Switch, { Item } from "react-switchable-next";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("Nigeria");

  return (
    <Switch name="countries" onItemChanged={(country) => setSelectedCountry(country)}>
      <Item value="Russia">Russia</Item>
      <Item default value="Nigeria">
        Nigeria
      </Item>
      <Item value="Venezuela">Venezuela</Item>
      <Item value="France">France</Item>
    </Switch>
  );
};

export default App;
```

## Accessible

Created with accessibility in mind. The following `gif` was made using MacOS
Sierra `VoiceOver`.

<p align="center">
  <img src="https://lab.alvarobg.com/react-switchable/assets/accessible.gif"/>
  <br><br>
  <br><br>
</p>

## Live demo

[![Try it online](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-switchable-alvarobernalg-lp823)

## API

### Switch

| Prop             | Type        | Required | Default   | Description                                          |
| ---------------- | ----------- | -------- | --------- | ---------------------------------------------------- |
| `name`           | string      | Yes      | ""        | Unique global identifier.                            |
| `children`       | Array[Item] | Yes      | []        | A list of Items.                                     |
| `onItemChanged`  | function    | No       | ""        | Fires after the selection of an Item.                |
| `onItemSelected` | function    | No       | ""        | Fires when an Item is selected.                      |
| `disable`        | boolean     | No       | false     | Disables the switch.                                 |
| `arrowSelection` | boolean     | No       | true      | Enables the selection of Items with arrow keys.      |
| `customOverlay`  | Overlay     | No       | undefined | Enables the use of a custom overlay React component. |

Inherits all other properties assigned from the parent component

### State | Item

| Prop      | Type    | Required | Default | Description                             |
| --------- | ------- | -------- | ------- | --------------------------------------- |
| `value`   | string  | Yes      | ""      | Represents the Item value.              |
| `active`  | boolean | No       | false   | Sets the Item as active.                |
| `disable` | boolean | No       | false   | Disables the Item.                      |
| `default` | boolean | No       | false   | Which Item should be active by default. |

Inherits all other properties assigned from the parent component.

### Overlay

| Prop            | Type   | Required | Default | Description                |
| --------------- | ------ | -------- | ------- | -------------------------- |
| `selectedIndex` | number | Yes      | ""      | The selected Item index.   |
| `totalItems`    | number | Yes      | ""      | The total number of Items. |

Inherits all other properties assigned from the parent component.

## Related

[react-sn-question](https://github.com/AlvaroBernalG/react-sn-question)

## Contributing

All contributions are welcome.

## License

MIT license @[Alvaro Bernal G](https://alvarobg.com).
