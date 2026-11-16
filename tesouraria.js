async function carregarDados() {
    try {
        const respostaEntradas = await fetch('http://localhost:8080/tesouraria/entradas');
        if(!respostaEntradas.ok){
            throw new Error('Erro ao carregar entradas');
        }
        const entradas = await respostaEntradas.json();
        const TotalEntradas = entradas.reduce((total,entrada) => {return total + Number(entrada.valor || 0)}, 0);

        const respostaDespesas = await fetch('http://localhost:8080/tesouraria/despesas');
        const despesas = await respostaDespesas.json();
        const TotalDespesas = despesas.reduce((total, despesa) => {return total + Number(despesa.valor || 0)}, 0);

        const respostaSaldo = await fetch('http://localhost:8080/tesouraria/saldo');
        const saldo = Number(await respostaSaldo.json());

        const moeda = (valor) => { return valor.toLocaleString('pt-BR',{ style:'currency', currency:'BRL' }) };
        document.getElementById("tE").textContent = moeda(TotalEntradas);
        document.getElementById("tD").textContent = moeda(TotalDespesas);
        document.getElementById("sA").textContent = moeda(saldo);
    } catch (error) {
        console.error('Erro ao carregar dados financeiros:', error);
    }
}
document.addEventListener('DOMContentLoaded', carregarDados);
