import { useEffect, useState } from 'react';
import './App.css';
import video from './nutrVideo.mp4';
import { NutritionComponent } from './NutritionComponent';
import { LoaderPage } from './LoaderPage';

function App() {
  
  const [myFoodSearch, setMyFoodSearch] = useState("");
  const [myNutritionComponents, setMyNutritionComponents] = useState();
  const [foodSubmitted, setfoodSubmitted] = useState("");
  const [stateLoader, setStateLoader] = useState(false);

  const APP_ID = '12693584';
  const APP_KEY = '04abbbd63f74efba3b41ab88b1066d3a';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const fetchData = async (ingr) => {
  setStateLoader(true);
  
    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

      if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutritionComponents(data);
    } else {
      setStateLoader(false);
      alert('Please enter the correct name of the ingredient');
    }
  }

  const myIngrSearch = (e) => {
    setMyFoodSearch(e.target.value);
  }
  const finalSearch = (e) => {
    e.preventDefault()
    setfoodSubmitted(myFoodSearch);
  }

useEffect(() => {
    if (foodSubmitted !== '') {
      let ingr = foodSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [foodSubmitted])

  return (
    <div className='App'>

      <div className='container'>
      <video autoPlay muted loop>
    <source src={video} type="video/mp4" />
        </video>
        <h1>Nutrition Analysis</h1> 
      </div >
      
      <div className='container'>
        <h3>Please enter the required amount of ingredients</h3>
      </div>

      <div className='container'>
      <p className='example'>(for example: 2 cup rice, 10 potatoes etc.)</p>
      </div>

      <div className='container'>
     <form onSubmit={finalSearch}>
         <input className='search'placeholder='Search...' onChange={myIngrSearch} value={myFoodSearch}/>
    </form>
      </div>

    <div className='container'>
    <button onClick={finalSearch}>
    <img src="https://img.icons8.com/?size=100&id=lWrS1b6nm22B&format=png&color=000000" height = '75px' alt="icon"/>
    </button>
      </div>
      <div className='container'>
        {stateLoader && <LoaderPage />}
        </div>
      <div className='components'>
        
        <div className='result'>
          {
          myNutritionComponents && <h2>{myNutritionComponents.calories} kcal</h2>
        }
        {
          myNutritionComponents && Object.values(myNutritionComponents.totalNutrients)
            .map(({ label, quantity, unit }) =>
              <NutritionComponent 
                label={label}
                quantity={quantity}
                unit={unit}
              />
          )
        }
       </div> 
      </div>
    </div>
  );
}

export default App;
