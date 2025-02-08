const PagamentoPrevisao = ({ pedido }) => {
    const gerarPrevisoes = () => {
        const datas = pedido.condicaoPagamento.split(",").map(dias => parseInt(dias));
        const valorParcela = (pedido.valor / datas.length).toFixed(2);

        return datas.map(dias => {
            const dataFaturamento = new Date(pedido.dataFaturamento);
            const dataPagamento = new Date(dataFaturamento.setDate(dataFaturamento.getDate() + dias));
            return { data: dataPagamento.toISOString().split("T")[0], valor: valorParcela };
        });
    };

    return (
        <div>
            <h4>Previsão de Pagamento:</h4>
            <ul>
                {gerarPrevisoes().map((parcela, index) => (
                    <li key={index}>{parcela.data} - R${parcela.valor}</li>
                ))}
            </ul>
        </div>
    );
};

export default PagamentoPrevisao;