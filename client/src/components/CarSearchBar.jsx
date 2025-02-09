import volkswagon from "../assets/svg/volkswagon.svg"

const CarSearchBar = ({ searchQuery, onSearch }) => {
    return (
        <div className="mt-6 mb-12">
            <h2 className="text-2xl font-semibold mb-2 sm:text-3xl">Car Catalogue</h2>
            <p className="text-sm sm:text-base">Explore the cars you might like</p>
            {/* Search box */}
            <div className="flex justify-between items-center ">
                <div className="mt-8 px-4 py-1 flex rounded-md bg-[#e7ebf5]">
                    <img src={volkswagon} alt="" />
                    {/* Fetch data on enter key press */}
                    <input type="text" placeholder="Mahindra" className="px-2 bg-transparent outline-none border-none" value={searchQuery} onChange={(e) => onSearch(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default CarSearchBar
