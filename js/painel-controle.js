$.ajax({
    type: 'POST',
    url: 'api/solicitacao/contarSolicitacoes',
    data: { token },
    success: function(result) {
        $.each(result.data, function(i, field) {
            $('#total').text(field.total);
            $('#pendente').text(field.pendente);
            $('#enviado').text(field.enviado);
            $('#analise').text(field.analise);
            $('#encaminhado').text(field.encaminhado);
            $('#concluido').text(field.concluido);
            var myChart = new Chart($('#chart-solicitacoes'), {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [
                            field.pendente,
                            field.enviado,
                            field.analise,
                            field.encaminhado,
                            field.concluido
                        ],
                        backgroundColor: [
                            '#dc3545', //danger
                            '#17A2B8', //info
                            '#007BFF', //primary
                            '#FFC107', //warning
                            '#28A745', //warning
                        ]
                    }],
                    labels: [
                        "PENDENTE",
                        "ENVIADO",
                        "ANÁLISE",
                        "ENCAMINHADO",
                        "CONCLUÍDO",
                    ]
                },
                options: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: "Solicitações"
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                }
            });
        })
    }
});

var chart_regional = new Chart($('#chart-regional'), {
    type: 'bar',
    data: {
        datasets: [{
            data: [],
            backgroundColor: coresBootstrap
        }],
        labels: []
    },
    options: {
        title: {
            display: true,
            text: "Solicitações por Município"
        },
        animation: {
            animateScale: true,
            animateRotate: true
        },
        legend: {
            display: false,
            position: 'right',
        },
        scales: {
            xAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Solicitações'
                }
            }],
        }
    }
});
$.ajax({
    type: 'POST',
    url: 'api/solicitacao/contarRegionais',
    data: { token },
    success: function(result) {
        chart_regional.data.labels = []
        chart_regional.data.datasets[0].data = []
        $.each(result.data, function(i, field) {
            chart_regional.data.labels.push(field.regional)
            chart_regional.data.datasets[0].data.push(field.total)
            chart_regional.update()
        })
    }
})