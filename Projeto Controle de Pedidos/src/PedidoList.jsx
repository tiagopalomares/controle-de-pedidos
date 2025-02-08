const PedidoList = ({ pedidos, excluirPedido }) => {
    return (
        <div>
            {pedidos.map((pedido) => {
                // Formatar data para dd/mm/aaaa
                const formatarData = (data) => {
                    const dataObj = new Date(data);
                    return dataObj.toLocaleDateString("pt-BR");
                };

                // Criar previsões de pagamento
                const criarPrevisaoPagamento = (data, prazo, valor) => {
                    const datas = [];
                    let totalParcelas = prazo / 30;
                    let valorParcela = (valor / totalParcelas).toFixed(2);

                    for (let i = 1; i <= totalParcelas; i++) {
                        let novaData = new Date(data);
                        novaData.setMonth(novaData.getMonth() + i);
                        datas.push({ data: formatarData(novaData), valor: valorParcela });
                    }

                    return datas;
                };

                return (
                    <div key={pedido.id} className="pedido">
                        <div className="pedido-info">
                            <span><strong>Marca:</strong> {pedido.marca}</span>
                            <span><strong>Valor:</strong> R${pedido.valor}</span>
                            <span><strong>Data de Faturamento:</strong> {formatarData(pedido.data)}</span>
                            <span><strong>Previsão de Pagamento:</strong></span>
                            <ul>
                                {criarPrevisaoPagamento(pedido.data, pedido.prazo, pedido.valor).map((parcela, index) => (
                                    <li key={index}>{parcela.data} - R${parcela.valor}</li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => excluirPedido(pedido.id)}>Excluir</button>
                    </div>
                );
            })}
        </div>
    );
};

export default PedidoList;
