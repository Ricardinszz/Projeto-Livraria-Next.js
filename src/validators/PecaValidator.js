import * as Yup from 'yup';

const PecaValidator = Yup.object().shape({
    nome: Yup.string()
        .min(2, 'O mínimo de caracteres é 2')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    descricao: Yup.string()
        .min(5, 'O mínimo de caracteres é 5')
        .max(100, 'O máximo de caracteres é 100')
        .required('Campo Obrigatório'),
    preco: Yup.string()
        .min(0, 'O preço deve ser um valor positivo')
        .required('Campo Obrigatório'),
    id_fornecedor: Yup.string()
        .required('Campo Obrigatório'),
    quantidade_estoque: Yup.number()
        .min(0, 'A quantidade deve ser um valor positivo')
        .required('Campo Obrigatório'),
});

export default PecaValidator;
