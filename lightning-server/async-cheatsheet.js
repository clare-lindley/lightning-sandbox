/**
 * 
 * 1. Async error handling with promises:
 * 
 * do something async inside the body of the Promise
 * handle the result with .then()
 * at the final .then we can resolve
 * at the end we catch the error and reject
 * 
 * all errors bubble up to catch
 */
function fetchDataWithPromises() {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })

            // happy path - the end of the promise chain so we can resolve
            .then(data => {
                resolve(data);
            })
            // this catches ALL the errors from either fetch() or response.json() or explicitly thrown
            // then we reject it
            .catch(error => {
                reject(error);
            });
    });
}


/* fetchDataWithPromises()
    // use the data from the resolved Promise
    .then(data => {
        // console.log(`fetchDataWithPromises ${JSON.stringify(data)}`);
    })
    // catch the errors raised in the rejected Promise
    .catch(error => {
        console.error('Error:', error);
    }); */


/**
 * 
 * 2. Async error handling with async/await - handle errors inside your API
 * do something async inside the try block
 * any errors that are thrown, by me or by the APIs I'm using are all handled by catch
 * 
 * when it comes to using the async function we can be confident that if we don't have data
 * then fetchData() has already handled this for us and will either throw or log or do whatever is the right thing 
 * 
 */


async function fetchDataWithASyncAwait1() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
    }

// const data1 = await fetchDataWithASyncAwait1();
// console.log(`fetchDataWithASyncAwait1 ${JSON.stringify(data1)}`);

/**
 * 
 * 3. Async error handling with async/await -handle errors at the call site
 * So this is slightly different - you let your API function run its course
 * and let the client handle the errors
 * 
 * we can't rely on our fetchData API to handle the errors now we have to handle them
 * ourselves:
 * 
 */


async function fetchDataWithASyncAwait2() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    throw new Error('oh no');
    const data = await response.json();
    return data;
}
// fetchDataWithASyncAwait2()
//     .then(data => {
//         throw new Error('we are not safe even here!'); 
//         console.log(`fetchDataWithASyncAwait2 ${JSON.stringify(data)}`)
//     })
//     .catch(error => console.log(error))

/**
 * 
 * 4. Handling errors with multiple promises with Promise.all()
 * and try...catch
 * 
 * if any of the promises reject inside Promise.all then the whole thing is rejected
 * it's a bit like a database transaction - that's how I see it anyway
 * 
 */
async function fetchMultipleData() {
    try {
        const [data1, data2] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()),
            fetch('https://jsonplaceholder.typicode.com/posts/2').then(res => res.json())
        ]);
        console.log(data1, data2);
    } catch (error) {
        console.error('Error:', error);
    }
}
// fetchMultipleData();

/**
 * Mix async/await with Promise handling
 * 
 * so in case makePizza() doesn't handle errors you can catch all that are thrown
 * like this instead of try...catch
 */

async function makePizza(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pizza = false;

            if(pizza) {
                resolve(pizza);
            }
            else {
                reject('NO PIZZA');
            }

        }, 2000); // Simulating an asynchronous operation
    });
}

/**
 * IMPORTANT!!!!!!! Be aware that in this case, if makePizza() throws an error
 * then pizza will be undefined (as that's what catch() returns in this case).
 * 
 * If that's not what you want you could:
 * 
 * consider explicitly throwing inside the error
 * handler, making "console.log({pizza});" unreachable 
 * 
 * OR optionally you could even make the error handler return a default value for pizza!
 * 
 * OR you could just use try catch and then you're guaranteed to have 'pizza' inside try
 */
async function go() {
    const pizza = await makePizza().catch(handleError);
    console.log({pizza});
}

function handleError(err) {
    console.log('Ohhhh nooo');
    console.log(err);
}
   
// await go()


/**
 * 
5. Using Higher Order Functions for Error Handling
Higher order functions can be used to create a safe version of an 
async function that automatically handles errors. This approach encapsulates
 the error handling logic, making it reusable across different async functions.

 This example shows how to create a higher order function that wraps an async
  function and automatically handles any errors that occur, providing a
    clean and reusable error handling mechanism

 */

function makeSafe(fn, errorHandler) {
    return function() {
       return fn().catch(errorHandler); // resolved promise value or undefined depending on resolved/rejected
    }
}

async function fetchData() {
    return new Promise((resolve, reject) => {
        // do sth async
        setTimeout(() => {
            const result = 'here is the result'
            if(result){
                resolve(result)
            }
            else {
                reject('OH NO!')
            }
        }, 1000)

    }) 
}

const safeFetchData = makeSafe(fetchData, handleError);

safeFetchData().then(data => console.log(data))