'use client'

import { Input, Button, Divider, Select, SelectItem } from "@nextui-org/react"
import { states } from '@/components/states'
import { addVenue } from "@/lib/actions/actions"
import { useActionState } from "react"

export default function AddVenueComponent(){
    const [state,action,isPending] = useActionState(addVenue,null)

    return(
      <form className="max-w-2xl mx-auto" action={action}>
        <h1 className="text-2xl py-5">Add venue</h1>
        <Divider className="mb-5"/>
        
        <Input
            className="mb-5"
            type="text"
            label="Venue name"
            variant="bordered"
            fullWidth={true}
            name="name"
        />

        <Input
            className="mb-5"
            type="text"
            label="Address"
            variant="bordered"
            fullWidth={true}
            name="address"
        />

        <Select
            items={states}
            label="State"
            placeholder="Select the state"
            fullWidth={true}
            className="mb-5"
            name="state"
        >
            {(state)=><SelectItem key={state.name}>{state.name}</SelectItem>}
        </Select>

        <Button color="secondary" variant="solid" type="submit">
            Add Venue
        </Button>
        { isPending && <div>...loading</div> }  
        <div className="my-5">
            { !state?.success ?
                <div className="text-danger">
                    <ul>
                        { state?.message.map((error,index)=>(
                            <li key={index}>- {error}</li>
                        ))}
                    </ul>
                </div>
            :
                <div className="text-success">
                    {state?.message}
                </div>
            }
        </div>
      </form>
    )
}