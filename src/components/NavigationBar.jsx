import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, } from "@nextui-org/navbar";
import { Avatar, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Chip } from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import api from "../helper/api";



const NavigationBar = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({})


    const getUser = async () => {
        try {
            const { data } = await api({
                url: '/user',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });


            console.log(data);
            setUser(data.user)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            <Navbar isBlurred maxWidth="xl" height={'53px'} isBordered className="bg-[#f5f5f5]">
                <NavbarBrand>
                    <Link to={'/'}>
                    <p className="font-bold uppercase text-inherit">Portraits</p>
                    </Link>
                </NavbarBrand>



                <NavbarContent as="div" justify="end">
                    <div className="hidden lg:flex gap-x-4">

                    <NavbarItem>
                        <Link color="foreground" to={'/'}>
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem >
                        <Link to={'/gallery'} aria-current="page" color="secondary">
                            Gallery
                        </Link>
                        <Chip className="ml-5 " color="success" variant="dot">Your credit <b>{user.credit}</b></Chip>
                    </NavbarItem>
                    </div>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                radius="md"
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="primary"
                                name="Jason Hughes"
                                size="sm"
                                src={user.photo}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{user.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem onClick={() => { localStorage.removeItem('access_token'); navigate('/login') }} key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar >
        </>
    )
}

export default NavigationBar