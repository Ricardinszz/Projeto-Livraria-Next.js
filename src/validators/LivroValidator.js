import * as Yup from 'yup';

const LivroValidator = Yup.object().shape({
    titulo: Yup.string()
        .required('Título é obrigatório'),
    autor: Yup.string()
        .required('Autor é obrigatório'),
    genero: Yup.string()
        .required('Gênero é obrigatório'),
    anoPublicacao: Yup.number()
        .required('Ano de publicação é obrigatório')
        .min(1900, 'Ano de publicação deve ser maior que 1900')
        .max(new Date().getFullYear(), `Ano de publicação não pode ser maior que ${new Date().getFullYear()}`),
    editora: Yup.string()
        .required('Editora é obrigatória'),
    resumo: Yup.string()
        .required('Resumo é obrigatório'),
    numeroPaginas: Yup.number()
        .required('Número de páginas é obrigatório')
        .min(1, 'Número de páginas deve ser maior que 0'),
    idioma: Yup.string()
        .required('Idioma é obrigatório'),
    capa: Yup.string()
        .url('Capa deve ser um URL válido')
        .required('Capa é obrigatória'),
    preco: Yup.string()
        .required('Preço é obrigatório')
});

export default LivroValidator;
