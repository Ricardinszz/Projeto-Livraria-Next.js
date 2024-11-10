import * as Yup from 'yup';

const ManutencaoValidator = Yup.object().shape({
    data_agendamento: Yup.string()
        .required('Campo Obrigatório'),
    cliente: Yup.string()
        .min(2, 'O mínimo de caracteres é 2')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
   
    funcionario: Yup.string()
        .min(2, 'O mínimo de caracteres é 2')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    custo: Yup.string()
        .required('Campo Obrigatório'),
    servico: Yup.string()
        .oneOf([
            'Troca de Óleo e Filtro',
            'Substituição de Pastilhas de Freio',
            'Troca de Pneus',
            'Substituição do Filtro de Ar',
            'Troca de Correia Dentada'
        ], 'Serviço inválido')
        .required('Campo Obrigatório'),
});

export default ManutencaoValidator;
