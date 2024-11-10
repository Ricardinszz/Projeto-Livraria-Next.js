import * as Yup from 'yup';

const VendaValidator = Yup.object().shape({
    id_cliente: Yup.string()
        .required('Campo Obrigatório'),
    valor_venda: Yup.string()
        .min(0, 'O valor deve ser um valor positivo')
        .required('Campo Obrigatório'),
    forma_pagamento: Yup.string()
        .required('Campo Obrigatório'),
});

export default VendaValidator;
