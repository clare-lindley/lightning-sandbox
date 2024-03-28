import * as React from "react";
import Images from "./Images";

/**
 * PLAN!
 * 
 * 1. node service that reads an images dir and returns an array of base64 encoded images - OK
 * 
 * 2. express endpoint that calls it - OK
 * 
 * 3. Custom hook to call THAT  https://www.phind.com/search?cache=g05utzamqm7gdbhhaqlb1bmi - OK
 * 
 * 4. React uses the hook, renders the images, add an onclick handler to the image that passes the src (base54 uri)
 * to food-search - and then we need to continue as normal with the vision search and the web search
 * 
 * YEAH PERFORMANCE, YEAH SECURITY - this is just for fun mmmkay?
 * ALTERNATIVE - file upload and FileReader API? 
 * 
 */

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
           <h1>Choose an Image</h1>
          <Images />
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