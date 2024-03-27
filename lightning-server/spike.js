import OpenAI from "openai";
import fs from 'fs';

const openai = new OpenAI();

const systemPrompt = `
              You are an agent specialized in describing images of cooked food
              with a short description that could be used to search for restaurants serving that type of food

              You will be provided with an image and your goal is to extract a search query string that describes the type of food

              The search query string can be a one word description of the food type
              e.g.
              - pizza
              - curry
              - kebab
              Or food from a particular country, just return the description of the country followed by the word food, 
              e.g.
              - greek food
              - chinese food
              - indian food
              - vietnamese food

              Return the search query in the format of a string, like this (do not surround it in quotes)
              pizza`



              /**
               * 
               * 
"type": "image_url", 
"image_url": 
{
      "url": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAA…"
    }
}} url 
               */

async function foodSearch(url) {
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
        {
            "role": "system",
            "content": systemPrompt
        },
        {
            role: "user",
            content: [
            { type: "text", text: `What's in this image?` },
            {
                type: "image_url",
                image_url: {
                // "url": "https://realfood.tesco.com/media/images/1400x919-230616-15-MINUTE-LUNCH-WIN-GREEK-SMASH-KEBAB-WRAPS-0076-11-0a747d3d-1a9b-42f9-a5fb-b90a1bca7c6f-0-1400x919.jpg"
                "url": url
                },
            },
            ],
        },
        ],
    });
  
  // @todo handle 400 Invalid image.
  const foodType = response.choices[0].message.content;    
  console.log(foodType) 
}


// Function to encode file data to base64 encoded string
function base64_encode(file, imageType = 'jpg') {
    // Read binary data
    const buffer = fs.readFileSync(file);
    // Convert binary data to base64 encoded string
    const base64String = Buffer.from(buffer).toString('base64');
    // Optionally, format as a data URI
    return `data:image/${imageType};base64,${base64String}`;
}

// Example usage
const base64str = base64_encode('./pizza.jpg', 'jpg');
// foodSearch('https://realfood.tesco.com/media/images/1400x919-230616-15-MINUTE-LUNCH-WIN-GREEK-SMASH-KEBAB-WRAPS-0076-11-0a747d3d-1a9b-42f9-a5fb-b90a1bca7c6f-0-1400x919.jpg');
foodSearch(base64str);