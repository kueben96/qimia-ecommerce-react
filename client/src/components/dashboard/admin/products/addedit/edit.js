import React, { useEffect,useState } from 'react';
import PicUpload from './upload';
import PicViewer from './picViewer';
import DashboardLayout from 'hoc/dashboardLayout';

import { useFormik } from 'formik';
import { errorHelper } from 'utils/tools';
import Loader from 'utils/loader'
import { validation, formValues, getValuesToEdit } from './formValues'; 


import { useDispatch, useSelector } from 'react-redux';
import { productEdit, productsById } from 'store/actions/product.actions';
import { clearCurrentProduct } from 'store/actions/index'
// import { clearProductAdd } from 'store/actions/index'

import { 
    TextField,
    Button,
    Divider,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
} from '@material-ui/core';


const AddProduct = (props) => {
    const [values,setValues] = useState(formValues);
    const [loading, setLoading] = useState(false);
    const products = useSelector(state=>state.products);
    const notifications =  useSelector(state=>state.notifications);
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:values,
        validationSchema: validation,
        onSubmit:(values)=>{
           handleSubmit(values)
        }
    });

    const handleSubmit = (values) => {
        setLoading(true);
        dispatch(productEdit(values, props.match.params.id))
    }


    const handlePicValue = (pic) => {
        const picArray = formik.values.images;
        picArray.push(pic.url);
        formik.setFieldValue('images',picArray)
    }

    const deletePic = (index) => {
        const picArray = formik.values.images;
        picArray.splice(index,1);
        formik.setFieldValue('images',picArray)
    }


    useEffect(()=>{
        if(notifications){
           setLoading(false)
        } 
    },[notifications ])


    useEffect(()=>{
        const param = props.match.params.id;
        if(param){
            dispatch(productsById(param))
        }
    },[dispatch, props.match.params.id]);

    useEffect(()=>{
        return()=>{
            dispatch(clearCurrentProduct())
        }
    },[dispatch])

    // useEffect(()=>{
    //     return()=>{
    //         dispatch(clearProductAdd())
    //     }
    // },[dispatch])


    return(
        <DashboardLayout title="Edit product">
        { loading ?
            <Loader/>
            :
            <>
                <PicViewer
                    formik={formik}
                    deletePic={(index)=> deletePic(index)}
                />
                <PicUpload
                    picValue={(pic)=> handlePicValue(pic)}
                />
                <Divider className="mt-3 mb-3"/>

                <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>

                <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name="name"
                            label="Enter a name"
                            variant="outlined"
                            {...formik.getFieldProps('name')}
                            {...errorHelper(formik,'name')}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name="description"
                            label="Enter the description"
                            variant="outlined"
                            {...formik.getFieldProps('description')}
                            {...errorHelper(formik,'description')}
                            multiline
                            rows={4}
                        />
                    </div>   

                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name="price"
                            label="Enter the price"
                            variant="outlined"
                            type="number"
                            {...formik.getFieldProps('price')}
                            {...errorHelper(formik,'price')}
                        />
                    </div>

                 

                  
                    <Divider className="mt-3 mb-3"/>

                    <Button 
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Edit product
                    </Button>   

                </form>
            </>
        }
        </DashboardLayout>
    )


} 


export default AddProduct; 