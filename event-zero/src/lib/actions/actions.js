'use server'
import DBconnect from '@/lib/db';
import Venue from '@/lib/models/venue';
import Event from '@/lib/models/events'
import AddVenueSchema from '@/components/forms/add_venue_schema';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export async function addVenue(prevState,formData){
    await DBconnect()
    try{
        // VALIDATION
        const isValid = await AddVenueSchema(formData);
        if(!isValid.success){
            return { success: false, message: isValid.errors }
        }

        const newVenue = new Venue({
            name: formData.get('name'),
            address: formData.get('address'),
            state: formData.get('state')
        });
        await newVenue.save();

        revalidatePath('/dashboard/add_event');
        return { success: true, message:"Event added" }
    }catch(error){
        return { success: false, message: [error.message] }
    }
}

export async function findEvents(skip,limit){
    try{
        await DBconnect();
        const request = await Event.find({})
        .populate({path:'venue',model:Venue})
        .sort([['_id','desc']])
        .skip(skip)
        .limit(limit);
        return request;
    } catch(error){
        throw new Error(error)
    }
}

export async function findEventById(id){
    await DBconnect();
    const request = await Event.find({slug:id}).populate({path:'venue',model:Venue}).exec();

    if(!request.length > 0){
        return notFound();
    }
    return request[0]
}