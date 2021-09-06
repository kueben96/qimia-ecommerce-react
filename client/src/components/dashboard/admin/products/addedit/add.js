import React, { useEffect,useState } from 'react';
import DashboardLayout from 'hoc/dashboardLayout';
import PicUpload from './upload'
import PicViewer from './picViewer'

import { useFormik } from 'formik';
import { errorHelper } from 'utils/tools';
import Loader from 'utils/loader'
import { validation } from './formValues';

import { useDispatch, useSelector } from 'react-redux';

import { productAdd } from 'store/actions/product.actions';
import { clearProductAdd } from 'store/actions/index'



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
    const [loading, setLoading] = useState(false);
    const notifications =  useSelector(state=>state.notifications);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{
            name:'',
            description:'',
            price:'',
            images: []
        },
        validationSchema: validation,
        onSubmit:(values)=>{
            console.log(values)
            handleSubmit(values)
        }
    });

    const handleSubmit = (values) => {
        setLoading(true);
        dispatch(productAdd(values))
    }
    const handlePicValue = (pic) =>{
        const picArray = formik.values.images;
        picArray.push(pic.url);
        formik.setFieldValue('images', picArray )
    }

    const deletePic = (index) => {
        const picArray = formik.values.images;
        picArray.splice(index, 1);
        formik.setFieldValue('images', picArray)
    }


    useEffect(()=>{
        if(notifications && notifications.success){
            props.history.push('/dashboard/admin/admin_products');
        } 
        if(notifications && notifications.error){
            setLoading(false)
        }
    },[notifications, props.history])


    return(
        <DashboardLayout title="Add product">
        { loading ?
            <Loader/>
            :
            <>
                <PicViewer formik={formik} deletePic={(index)=> deletePic(index)}/>
                <PicUpload
                    picValue={(pic=>handlePicValue(pic))}></PicUpload>
                <Divider className="mt-3 mb-3"/>
                <form className="mt-3 article_form" onSubmit={formik.handleSubmit} >
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
                        Add product
                    </Button>   

                        
                        
                </form>
            </>
        }
        </DashboardLayout>
    )


} 


export default AddProduct;