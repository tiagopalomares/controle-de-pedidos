import { useState, useEffect } from "react";
import PedidoForm from "./PedidoForm.jsx";
import PedidoList from "./PedidoList.jsx";
import "./App.css";

const App = () => {
    const [pedidos, setPedidos] = useState([]);

    // Carregar os pedidos do Local Storage ao iniciar
    useEffect(() => {
        const pedidosSalvos = localStorage.getItem("pedidos");
        if (pedidosSalvos) {
            setPedidos(JSON.parse(pedidosSalvos));
        }
    }, []);

    // Salvar os pedidos sempre que houver mudança
    useEffect(() => {
        if (pedidos.length > 0) {
            localStorage.setItem("pedidos", JSON.stringify(pedidos));
        }
    }, [pedidos]);

    // Função para adicionar um pedido
    const adicionarPedido = (pedido) => {
        const novoPedido = { ...pedido, id: Date.now() }; // Garante um ID único
        setPedidos([...pedidos, novoPedido]);
    };

    // Função para excluir um pedido
    const excluirPedido = (id) => {
        const novaLista = pedidos.filter((pedido) => pedido.id !== id);
        setPedidos(novaLista);
    };

    return (
        <div>
            <h1>Controle de Pedidos</h1>
            <PedidoForm adicionarPedido={adicionarPedido} />
            <PedidoList pedidos={pedidos} excluirPedido={excluirPedido} />
        </div>
    );
};

export default App;
