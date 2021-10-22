import React from 'react';
import { Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import './App.css';

const family = [
  {
    name: "Diane and Brian Kelly",
    id: "kelly-family",
    description: "The Kellys are very nice people who live in Westlake.",
    children: [
      {
        name: "Clare and Juan",
        id: "clare-and-juan",
        description: "Clare and Juan just got married and the wedding was fun.",
        children: [
          {
            name: "Randall",
            id: "randall",
            description: "Randall is a runner.",
          }
        ]
      },
      {
        name: "Daniel",
        id: "daniel",
        description: "Daniel is awesome and so is his girlfriend.",
        children: [
          {
            name: "Boots",
            id: "boots",
            description: "Boots is a street dog from Aruba.",
          }
        ]
      }
    ]
  },
  {
    name: "Jeff and Carolyn Reece",
    id: "reece-family",
    description: "The Reeces have worked really hard to have a close, loving family.",
    children: [
      {
        name: "Jacqueline and Beau Frasier",
        id: "frasier-family",
        description: "Jacqueline and Beau love to drink and watch football.",
        children: [
          {
            name: "Ford",
            id: "ford",
            description: "Ford is a hard-charger."
          }
        ]
      },
      {
        name: "Hayden and Kaylie",
        id: "hayden-and-kaylie",
        description: "I really like Kaylie.",
      },
      {
        name: "Harrison and Morgan",
        id: "harrison-and-morgan",
        description: "Harrison and MOrgan are getting married next year i think.",
      },
      {
        name: "Madeline and Taylor",
        id: "madeline",
        description: "I have never spoken to Taylor but 'football' and 'golf' i guess?",
      },
    ]
  },
];

function Home(){
  return <h1> This is Home. </h1>
}

function Child(){
  const { famID, cuzID } = useParams();
  const cuz = family.find(({ id }) => id === famID).children.find(({ id }) => id === cuzID);
  // console.log(cuz);

  return (
    <div>
      <h3>{cuz.name}</h3>
      <p>{cuz.description}</p>
    </div>
  )
}

function Cousin(){
  const { famID } = useParams();
  const { url, path} = useRouteMatch();
  // console.log('url: ', url, ' | path: ', path);

  const fam = family.find(({ id }) => id === famID)

  return(
    <div>
      <h3>{fam.name}</h3>
      <p>{fam.description}</p>
      <ul>
      {
        fam.children.map((cuz) => (
          <li key={cuz.id}>
            <Link to={`${url}/${cuz.id}`}>
              {cuz.name}
            </Link>
          </li>
        ))
      }
      </ul>

      <hr />

      <Route path={path + "/:cuzID"}>
        <Child />
      </Route>
    </div>
  )
}

function Family(){
  const { path, url } = useRouteMatch();

  return (
    <div>
      <h1> Family: </h1>
      <ul>
        {family.map( ({ name, id }) => (
          <li key={id}>
            <Link to={`${url}/${id}`}> {name} </Link>
          </li>
        ))}
      </ul>

      <hr/>

      <Route path={`${path}/:famID`}>
        <Cousin />
      </Route>

    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li><Link to='/'> HOME </Link></li>
          <li><Link to='/fam'> FAMILY </Link></li>
        </ul>

        <hr />
        <Route exact path="/" component={Home}/>
        <Route path="/fam">
          <Family/>
        </Route>
      </header>
    </div>
  );
}

export default App;
