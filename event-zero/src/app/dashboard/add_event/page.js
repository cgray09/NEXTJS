import AddEventComponent from "@/components/forms/add_event_form"

import DBconnect from "@/lib/db"
import Venue from "@/lib/models/venue"
import Event from "@/lib/models/events"
import { revalidatePath } from "next/cache";


export default async function AddEventPage() {
    await DBconnect();
    const venues = await Venue.find({});
    
    async function addEvent(formData) {
        'use server'
        await DBconnect();
        try{
            const newEvent = new Event({...formData});
            await newEvent.save();

            revalidatePath('/dashboard');
            revalidatePath('/')

            return { success: true, message:'Ok'}
        } catch(error){
            return { success: false, message: error.message }
        }
    }


    return(
       <AddEventComponent
            venuesList={JSON.parse(JSON.stringify(venues))}
            postEvent={addEvent}
       />
    )
}