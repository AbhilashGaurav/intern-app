import React from "react";
import Card from "./Card/Card";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Cards({setSelectId, selectId}) {
  const { category } = useParams();
  const cards = useSelector((state) =>
    state.card.cards.filter((card) => card.category === category)
  );
  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} card={card} setSelectId={setSelectId}/>
      ))}
    </div>
  );
}
