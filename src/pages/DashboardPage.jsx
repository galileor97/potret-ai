import React, { useState } from 'react'
import { Button, Chip, Spinner } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import api from '../helper/api';
import Swal from 'sweetalert2'

const DashboardPage = () => {

    const [generatedImage, setGeneratedImage] = useState('')
    const [base_image, setBase_image] = useState(null);
    const [style_image, setStyle_image] = useState(null);
    const [identity_image, setIdentity_image] = useState(null);
    const [composition_image, setComposition_image] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [credit, setCredit] = useState()
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);


    const handleGenerate = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        const formData = new FormData();
        if (base_image) formData.append('base_image', base_image.file);
        if (style_image) formData.append('style_image', style_image.file);
        if (identity_image) formData.append('identity_image', identity_image.file);
        if (composition_image) formData.append('composition_image', composition_image.file);


        try {

            let { data } = await api.post('/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            console.log(data);
            setGeneratedImage(data.cloudinaryUrl);
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleImageUpload = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ file: file, preview: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const renderImageCard = (image, alt) => (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none max-w-fit"
        >
            <Image
                alt={alt}
                className="object-cover"
                height={70}
                src={image?.preview || "https://nextui.org/images/hero-card.jpeg"}
                width={70}
            />
        </Card>
    );

    const handleOpenImage = () => {
        if (generatedImage) {
            window.open(generatedImage, '_blank');
        }
    };

    const handleDownloadImage = () => {
        if (generatedImage) {
            const link = document.createElement('a');
            link.href = generatedImage;
            link.download = 'generated-image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handlePhotoUpdate = async () => {
        if (generatedImage) {
            setIsUpdatingProfile(true);
            try {
                const response = await api.put('/user/profile-photo', { photoUrl: generatedImage }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                // console.log('Profile photo updated:', response.data);
                Swal.fire({
                    title: 'Alright!',
                    text: 'Update photo profile success',
                    icon: 'success'
                })
            } catch (error) {
                if (error.response) {
                    Swal.fire({
                        title: 'Error!',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            } finally {
                setIsUpdatingProfile(false);
            }
        }
    };

    return (
        <>
            <Card className="max-w-full texture lg:px-24" radius='none'>
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-2xl pb-3">Omni-Zero [v1] </p>
                        <p className="text-small text-default-500">Omni-Zero: A diffusion pipeline for zero-shot stylized portrait creation.</p>
                    </div>
                </CardHeader>
                <div className='flex gap-x-2'>
                    <Chip className='ml-2' color="success" variant="bordered">Fast Result</Chip>
                    <Chip color="primary" variant="dot">Public</Chip>
                </div>
                <CardBody>
                    <Link
                        className='max-w-fit'
                        isExternal
                        showAnchorIcon
                        href="https://github.com/okaris/omni-zero.git"
                    >
                        Visit on GitHub.
                    </Link>
                </CardBody>
            </Card>
            <Divider />

            <div className='grid gap-y-5 lg:grid-cols-2 lg:px-24 lg:py-7 gap-x-10'>
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
                        <p className="text-tiny uppercase font-bold pb-5">Input</p>
                        <Card className='w-full texture p-5' isBlurred>
                            <CardHeader className='px-4 flex-col items-start'>
                                <h4 className="font-bold text-md">Upload</h4>
                                <small className="text-default-500">Upload the requirement files</small>
                                <form className='w-full pt-4' onSubmit={handleGenerate}>
                                    <div className='flex'>
                                        {renderImageCard(base_image, "Base Image")}
                                        <Divider orientation="vertical" className='px-1' />
                                        {renderImageCard(style_image, "Style Image")}
                                        <Divider orientation="vertical" className='px-1' />
                                        {renderImageCard(identity_image, "Identity Image")}
                                        <Divider orientation="vertical" className='px-1' />
                                        {renderImageCard(composition_image, "Composition Image")}
                                    </div>
                                    <label className="block mb-1 text-sm font-medium text-gray-900 pt-3" htmlFor="base_image">Base Image</label>
                                    <input className="block w-full p-2 mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                        id="base_image" type="file" onChange={(e) => handleImageUpload(e, setBase_image)} />

                                    <label className="block mb-1 text-sm font-medium text-gray-900 pt-3" htmlFor="style_image">Style Image</label>
                                    <input className="block w-full p-2 mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                        id="style_image" type="file" onChange={(e) => handleImageUpload(e, setStyle_image)} />

                                    <label className="block mb-1 text-sm font-medium text-gray-900 pt-3" htmlFor="identity_image">Identity Image</label>
                                    <input className="block w-full p-2 mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                        id="identity_image" type="file" onChange={(e) => handleImageUpload(e, setIdentity_image)} />

                                    <label className="block mb-1 text-sm font-medium text-gray-900 pt-3" htmlFor="composition_image">Composition Image</label>
                                    <input className="block w-full p-2 mb-4 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                        id="composition_image" type="file" onChange={(e) => handleImageUpload(e, setComposition_image)} />
                                    <Button type="submit" color="primary" variant="solid" className='text-white px-10 mt-4' disabled={isLoading}>
                                        {isLoading ? 'Generating...' : 'Generate'}
                                    </Button>
                                </form>
                            </CardHeader>
                        </Card>
                    </CardHeader>
                    <small className="text-default-500 px-7 pt-5"> <strong>Hint: </strong>Upload the high quality image will have high quality result</small>
                </Card>

                {/* OUTPUT */}
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
                        <p className="text-tiny uppercase font-bold pb-5">Output</p>
                        <Card className='w-full texture ' isBlurred>
                            <div className='w-full'>
                                <div className='relative' style={{ paddingBottom: 'calc(1024 / 960 * 100%)' }}>
                                    {isLoading ? (
                                        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                                            <Spinner size="lg" />
                                        </div>
                                    ) : generatedImage ? (
                                        <img
                                            src={generatedImage}
                                            alt="Generated image"
                                            className="object-cover w-full h-full absolute top-0 left-0"
                                        />
                                    ) : (
                                        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                                            <p className="text-gray-400">Waiting for your input ... </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                        {generatedImage && !isLoading ? (
                            <div>
                                <Divider orientation='horizontal' className='my-2' />
                                <div className='flex gap-x-2'>
                                    <Button color="default" variant="ghost" onClick={handleOpenImage}>
                                        Open
                                    </Button>
                                    <Button color="default" variant="ghost" onClick={handleDownloadImage}>
                                        Download
                                    </Button>
                                    <Button
                                        color="default"
                                        variant="ghost"
                                        onClick={handlePhotoUpdate}
                                        disabled={isUpdatingProfile}
                                    >
                                        {isUpdatingProfile ? 'Updating...' : 'Update Photo Profile'}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <small className="text-default-500 px-2 pt-5">
                                {isLoading ? 'Generating image...' : 'Credit will be reduced once inference is done.'}
                            </small>
                        )}
                    </CardHeader>
                </Card>
            </div>
        </>
    )
}

export default DashboardPage