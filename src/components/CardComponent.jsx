import { Button, Card, CardFooter, Image } from '@nextui-org/react'
import React from 'react'
import ModalDelete from './ModalDelete';

const CardComponent = ({ image, getAllImage }) => {

    // console.log(image);
    // console.log(image.imageUrl);
    return (
        <div className=''>
            <Card isFooterBlurred className="w-[300px] h-[400px] col-span-12 sm:col-span-5">
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full  object-cover"
                    src={image.imageUrl}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between px-4">
                    <div >
                        <p className="text-white text-tiny">Date created.</p>
                        <p className="text-white text-tiny">{new Intl.DateTimeFormat('en-GB', {
                            dateStyle: 'full',
                        }).format(new Date(image.createdAt))}</p>
                    </div>
                    <ModalDelete id={image.id}  getAllImage={getAllImage} />
                </CardFooter>
            </Card>
        </div>
    )
}

export default CardComponent