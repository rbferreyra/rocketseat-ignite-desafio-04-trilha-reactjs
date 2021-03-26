import React, { useEffect, useState } from "react";
import Food from "../../components/Food";
import Header from "../../components/Header"
import api from "../../services/api";
import { FoodsContainer } from "./styles";

interface FoodInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

const Dashboard = (): JSX.Element => {
  const [foods, setFoods] = useState<FoodInterface[]>([]);

  useEffect(() => {
    async function loadFoods() {
      await api.get('foods').then(response => {
        setFoods(response.data);
      });
    }

    loadFoods();
  }, []);

  return (
    <>
      <Header />
      <FoodsContainer data-testid="foods-list">
      {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
              />
            ))}
      </FoodsContainer>
    </>
  )
};

export default Dashboard;