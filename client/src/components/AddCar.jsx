import { useState } from 'react';
import Button from './Button';
import { handleError, handleSuccess, } from '../Util';
import { imageDB } from '../firebase/Config';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid'
import axios from 'axios';
import Input from './Input';
import { useAuth } from '../Context/AuthContext';

const AddCar = () => {

    const {baseURL} = useAuth()
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();

    const [addCar, setAddCar] = useState({
        make: "",
        model: "",
        year: "",
        rentedPrice: "",
        availability: "",
        image: "",
        imageStoragePath: "",
        description: ""
    })

    const handleContainerClick = (e) => {
        // Prevents the click event from propagating
        e.stopPropagation();
        document.getElementById('fileInput').click(); // Triggers the file input click
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const type = file.type.toString()
            if (type.startsWith("image")) {
                setImage(file)
            }
            else {
                handleError("Selected file is not image!")
            }

        }
    };

    // Handle all input change event
    const handleChange = (e) => {
        setAddCar({ ...addCar, [e.target.name]: e.target.value })
    }

    // 2. Upload the image and return url of stored image - Firebase
    const uploadImage = async () => {
        const uid = v4()
        try {
            if (!image) {
                return handleError("Please select image")
            }
            else {
                const imageRef = ref(imageDB, `CarImages/${uid}`)
                const snapshot = await uploadBytes(imageRef, image)
                const imageURL = await getDownloadURL(snapshot.ref)
                return { imageURL, uid }
            }
        } catch (error) {
            return handleError("Failed to upload image!")
        }
    }

    // Handling form submission
    const handleAddCar = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const headers = { Authorization: token }
        const { make, model, year, rentedPrice, availability, description } = addCar
        if (!make || !model || !year || !rentedPrice || !availability || !description) {
            setIsLoading(false)
            return handleError("All fields are required!")
        }

        if (year < 2000 || year > new Date().getFullYear()) {
            setIsLoading(false)
            return handleError("Year must be between 2000 and 2025")
        }

        try {
            const {imageURL, uid} = await uploadImage()
            if (!imageURL) {
                setIsLoading(false)
                throw new Error("Failed to Upload image");
            }
            else {
                const carData = { ...addCar, image: imageURL , imageStoragePath: `CarImages/${uid}`};
                const res = await axios.post(`${baseURL}admin/add-car`, carData, { headers })
                handleSuccess(res.data.msg)
                setAddCar({
                    make: "",
                    model: "",
                    year: "",
                    rentedPrice: "",
                    availability: "",
                    image: "",
                    imageStoragePath: "",
                    description: ""
                })
                setImage(null)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            // Delete the uploaded image if MongoDB operation fails
            const deleteRef = ref(imageDB, `CarImages/${uid}`);
            await deleteObject(deleteRef);
            handleError(error.response?.data?.msg || "An error occurred");
        }
    }


    return (
        <div className='w-full h-full '>
            <h2 className='text-primary text-2xl font-bold text-center mt-4'>Add Car</h2>

            <form className="w-full flex flex-col justify-center items-center pb-10" onSubmit={handleAddCar} >

                <div className="mt-4 w-1/2">
                    <Input type="text" name="make" placeholder="Make" value={addCar.make} onChange={handleChange} />

                    <Input type="text" name="model" placeholder="Model" value={addCar.model} onChange={handleChange} />

                    <Input type="number" name="year" placeholder="Year" value={addCar.year} onChange={handleChange} />

                    <Input type="number" name="rentedPrice" placeholder="Rented Price" value={addCar.rentedPrice} onChange={handleChange} />

                    <select
                        name="availability"
                        id="availability"
                        className="border-border border-[1px] rounded-md pr-2 my-2 w-full bg-transparent outline-none px-2 py-[2px]"
                        value={addCar.availability}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>
                            Select Availability of car
                        </option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>

                    <div onClick={handleContainerClick}
                        className="w-full aspect-square border-4 border-dashed my-2 border-gray-400 flex justify-center items-center cursor-pointer hover:border-primary rounded-md"
                    >
                        {image ? (
                            // If image is selected, display the image inside the container
                            <img src={URL.createObjectURL(image)} alt="Selected" className="w-full h-full object-cover rounded-md" />
                        ) : (
                            // If no image is selected, display a placeholder text
                            <span className="text-gray-500">Click to upload image</span>
                        )}
                    </div>

                    <textarea rows={5} col={30} type="number" name="description" id="description" placeholder='Description' value={addCar.description} onChange={handleChange} className='resize-none border-border border-[1px] rounded-md pr-2 my-2 w-full bg-transparent outline-none px-2 py-[2px]' />

                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <Button text="Add Car" isLoading={isLoading} />
                </div>
            </form>
            
        </div>
    )
}

export default AddCar
