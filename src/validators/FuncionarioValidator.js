import * as Yup from 'yup';

const FuncionarioValidator = Yup.object().shape({
    nome: Yup.string()
        .min(2, 'O mínimo de caracteres é 2')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    cargo: Yup.string()
        .min(2, 'O mínimo de caracteres é 2')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    salario: Yup.string()
        .min(0, 'Salário deve ser um valor positivo')
        .required('Campo Obrigatório'),
    data_contratacao: Yup.date()
        .required('Campo Obrigatório'),
    telefone: Yup.string()
        .min(10, 'O mínimo de caracteres é 10')
        .max(15, 'O máximo de caracteres é 15')
        .required('Campo Obrigatório'),
});

export default FuncionarioValidator;
