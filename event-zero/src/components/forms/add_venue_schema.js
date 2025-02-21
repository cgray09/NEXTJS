import * as yup from 'yup'

export default async function AddVenueSchema(formData){
    ///GET  DATA
    const data = {
        name: formData.get('name'),
        address: formData.get('address'),
        state: formData.get('state')
    }

    /// SCHEMA
    const schema = yup.object({
        name: yup.string().required('Name is required').min(2).max(50),
        address: yup.string().required('Address is required').min(5).max(100),
        state: yup.string().required('State is required')
    });

    try{
        await schema.validate(data,{ abortEarly: false });    
        return { success: true, data: data }
    } catch(errors){
        let newErrors = [];
        errors.inner.forEach(({path,message})=>{
            if(path != null){
                newErrors.push(message)
            }
        });
        return { success: false, errors: newErrors }
    }
}