import style from "./body.module.css";
import Tags from "../Tags/Tag.jsx";
import Card from "./card/Card.jsx";
import imgVuota from "../../assets/imagine-vuota.jpg";
import brawlStars from "../../assets/database/brawlStars.js";
import {useState} from 'react';

export default function Body() {

  //tag che stampiano sotto il header
  const tagTopics = [];
  // console.log(tagTopics);

  brawlStars.forEach((el) => {
    // console.log("ecco tutti tipi di  tag", el.tag);
    el.tag.forEach((val) => {
      if (!tagTopics.includes(val)) {
        tagTopics.push(val);
      }
    });
  });

  //state della struttura dati
  const [ brawler, setBrawler ] = useState(brawlStars);

  //state per input text
  const [ newBrawler, setNewBrawler ] = useState ('Nita');


  // GESTIONE INPUT TEXT
  //creiamo una funzione per gestire il value di imput Text
  function onTextChange(e){
    console.log(e.target.value) //=> acccedere a la proprieta value
    setNewBrawler(e.target.value) //Passiamo il value alla funzione setNewBrawler del nostro state per  input text
  }

  
  //GESTIONE INPUT SUBMIT
  function addBrawler(e){
    e.preventDefault()//per evitare dei risettare il sito
   
    const newBrawlerObject = {
      id: brawler.length + 1, // nuovo Id value
      name: newBrawler, // Nuovo Brawler value
      description: "This is a new Brawler", // nuova Description value
      thumb: imgVuota, // Nuova Thumb value
      tag: ["New"], // Nuova Tag value
      published: false, //Nuovo Booleano
    };

    //nel nostro array, creiamo un nuovo array con il valore che ci arriva da Set Brawler
    setBrawler([...brawler, newBrawlerObject])
    console.log(setBrawler([...brawler, newBrawlerObject]))
    setNewBrawler('')//dopo Submit svuotiamo il campo di input text
  }

  return (
    <main>
      <section className={style.tagsContainer}>
        <Tags  tags={tagTopics} />



        <div>
         
          <form action="" onSubmit= { addBrawler }>   {/* //FORM */}

            <input  //INPUT TEXT
            onChange = { onTextChange }
            type="text" 
            placeholder="Aggiungi un Brawler" 
            value = { newBrawler }/>

            <input  //INPUT SUBMIT 
            type="submit" 
            value='Aggiungi'/>
          </form>
        </div>



      </section>
      <section className={style.cardContainer}>
        <div className={style.col}>
          {brawler.map((el) => (
            <Card
              thumb={el.thumb}
              title={el.name}
              tag={el.tag}
              description={el.description}
              key={el.id}
              published={el.published}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
