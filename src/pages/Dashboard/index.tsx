import React, { useEffect, useState } from "react";
import Food from "../../components/Food";
import Header from "../../components/Header"
import ModalAddFood from "../../components/ModalAddFood";
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadFoods() {
      await api.get('foods').then(response => {
        setFoods(response.data);
      });
    }

    loadFoods();
  }, []);

  const handleDeleteFood = async (id: number) => {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const handleAddFood = async (food: FoodInterface) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={() => handleDeleteFood(food.id)}
            />
          ))}
      </FoodsContainer>
    </>
  )
};

export default Dashboard;