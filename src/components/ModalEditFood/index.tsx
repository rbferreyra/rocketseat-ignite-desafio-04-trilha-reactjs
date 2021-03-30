import React, { createRef } from "react";
import { FiCheckSquare } from "react-icons/fi";
import Input from "../Input";
import Modal from "../Modal";
import { Form } from "../ModalAddFood/styles";

interface FoodInterface {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
    image: string;
}

interface ModalEditProps {
    isOpen: boolean;
    setIsOpen: () => void;
    handleUpdateFood: (data: FoodInterface) => void;
    editingFood: FoodInterface;
}

const ModalEditFood = ({ isOpen, setIsOpen, handleUpdateFood, editingFood }: ModalEditProps): JSX.Element => {
    const formRef = createRef<HTMLFormElement>();

    const handleSubmit = async (data: FoodInterface) => {
        handleUpdateFood(data);
        setIsOpen();
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef as any} onSubmit={handleSubmit} initialData={editingFood}>
                <h1>Editar Prato</h1>
                <Input name="image" placeholder="Cole o link aqui" />

                <Input name="name" placeholder="Ex: Moda Italiana" />
                <Input name="price" placeholder="Ex: 19.90" />

                <Input name="description" placeholder="Descrição" />

                <button type="submit" data-testid="edit-food-button">
                    <div className="text">Editar Prato</div>
                    <div className="icon">
                        <FiCheckSquare size={24} />
                    </div>
                </button>
            </Form>
        </Modal>
    );
};

export default ModalEditFood;