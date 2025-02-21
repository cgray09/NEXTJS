'use client'
import { Navbar, NavbarBrand, NavbarContent, Dropdown,DropdownItem,DropdownTrigger,DropdownMenu,Button, DropdownSection } from "@nextui-org/react"
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

export default function NavComponent(){
    const { data:session } = useSession();
    
    const logoutUser = () => {
        signOut({
            callbackUrl:'/'
        })
    }

    return(
        <Navbar
            shouldHideOnScroll
            isBordered
            className="bg-gray-900 border-b-4 border-slate-400"
        >
            <NavbarBrand>
                <Link 
                    href="/"
                    className="text-inherit text-2xl antonfont text-white"
                >
                    Event0
                </Link>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button variant="bordered" className="text-white">
                            Menu
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Profile actions" variant="flat">
                       
                        <DropdownSection>
                            {!session ?
                                <DropdownItem key="register" textValue="register">
                                    <Link href="/register">Register</Link>
                                </DropdownItem>
                            :
                                <DropdownItem key="log_out" onClick={logoutUser} textValue="log_out">
                                    Log out
                                </DropdownItem>
                            }
                        </DropdownSection>

                        { session ?
                        <DropdownSection title="Admin actions">
                            <DropdownItem key="dashboard" textValue="dashboard">
                                <Link href="/dashboard">Dashboard</Link>
                            </DropdownItem>
                            <DropdownItem key="addevent" textValue="addevent">
                                <Link href="/dashboard/add_event">Add Event</Link>
                            </DropdownItem>
                            <DropdownItem key="addvenue" textValue="addvenue">
                                <Link href="/dashboard/add_venue">Add Venue</Link>
                            </DropdownItem>
                        </DropdownSection>
                        :null}   
                            
                       
                    </DropdownMenu>

                </Dropdown>
            </NavbarContent>
        </Navbar>
    )
}