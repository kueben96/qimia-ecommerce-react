import * as Yup from 'yup';

export const formValues = {
    name:'',
    description:'',
    price:'',
    images:[]
}
export const getValuesToEdit = (product) => {
    return {
        name: product.name,
        description: product.description,
        price: product.price,
        images:product.images
    }
}

export const validation = () => (
    Yup.object({
        name: Yup.string()
        .required('Sorry, the name is required'),
        description: Yup.string()
        .required('Sorry, the description is required'),
        price:Yup.number()
        .required('Must be a price')
        .min(1,'Sorry the min is 1')
        .max(200,'Sorry its 200 max')
    })
) 