import { useState } from "react";

const PedidoForm = ({ adicionarPedido }) => {
    const [marca, setMarca] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");
    const [prazo, setPrazo] = useState("30");
    const [prazoPersonalizado, setPrazoPersonalizado] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!marca || !valor || !data) return;

        // Se for "personalizado", pega o valor do campo extra
        const prazoFinal = prazo === "personalizado" ? prazoPersonalizado : prazo;

        adicionarPedido({ marca, valor, data, prazo: prazoFinal });
        setMarca("");
        setValor("");
        setData("");
        setPrazo("30");
        setPrazoPersonalizado("");
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input 
                type="text" 
                placeholder="Marca" 
                value={marca} 
                onChange={(e) => setMarca(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="Valor" 
                value={valor} 
                onChange={(e) => setValor(e.target.value)} 
            />
            <input 
                type="date" 
                value={data} 
                onChange={(e) => setData(e.target.value)} 
            />
            <select value={prazo} onChange={(e) => setPrazo(e.target.value)}>
                <option value="30">30 dias</option>
                <option value="60">60 dias</option>
                <option value="90">90 dias</option>
                <option value="personalizado">Personalizado</option>
            </select>

            {/* Exibir campo extra apenas se for "personalizado" */}
            {prazo === "personalizado" && (
                <input 
                    type="number" 
                    placeholder="Digite o prazo (dias)" 
                    value={prazoPersonalizado} 
                    onChange={(e) => setPrazoPersonalizado(e.target.value)} 
                />
            )}

            <button type="submit">Adicionar Pedido</button>
        </form>
    );
};

export default PedidoForm;
