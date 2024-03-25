import * as React from "react";

export default function ImageSearch() {

    const [input, setInput] = React.useState('')
    const [foodType, setFoodType] = React.useState('')
    const [restaurants, setRestaurants] = React.useState([])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleClick =  async () => {

      console.log('searching...')

      const foodResponse = await fetch(`http://localhost:5000/food-search?url=${input}`, {method: 'GET'})
      const foodType = await foodResponse.json()
      console.log(foodType)
      setFoodType(foodType)

      const searchResponse = await fetch(`http://localhost:5000/restaurant-search?foodType=${foodType}`, {method: 'GET'})
      const restaurants = await searchResponse.json();
      console.log(restaurants);

      const stuffToDisplay = restaurants.items.map(item => (
        {
          title: item.title,
          url: item.formattedUrl
        }
        ))

      console.log(stuffToDisplay);

      setRestaurants(stuffToDisplay)
      setInput('')

    }

    return (
        <div>
          <h1>Enter Image URL</h1>
          <input
            type="text"
            placeholder="Image URL..."
            value={input}
            onChange={handleChange}
          />
          <input type="button" onClick={handleClick} value="FIND RESTAURANTS!" />

          {foodType && <p>This is a photo of: {foodType}</p>}
            {restaurants.length > 0 && (
              <>
                <p>These are all the restaurants near us that serve {foodType}: </p> 
                <ul>
                  {restaurants.map((item, index) => (
                    <li key={index}><a href={item.url}>{item.title}</a></li>
                  ))}
                </ul>
              </>
            )}
        </div>
      );

}