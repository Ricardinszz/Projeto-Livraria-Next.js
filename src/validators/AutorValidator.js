import * as Yup from 'yup';

const AutorValidator = Yup.object().shape({
    nome: Yup.string()
        .min(2, 'O mínimo de caracteres é 2')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    endereco: Yup.string()
        .min(5, 'O mínimo de caracteres é 5')
        .max(100, 'O máximo de caracteres é 100')
        .required('Campo Obrigatório'),
    telefone: Yup.string()
        .min(10, 'O mínimo de caracteres é 10')
        .max(15, 'O máximo de caracteres é 15')
        .required('Campo Obrigatório'),
    email: Yup.string()
        .email('Email inválido')
        .required('Campo Obrigatório'),
    contato_principal: Yup.string()
        .min(2, 'O mínimo de caracteres é 2')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
});

export default AutorValidator;
