import React from 'react'

const Store = () => {
    return (
        <div>
            <div className='flex flex-col mx-auto justify-center items-center mt-60 space-y-9 w-96'>
                <h1 className='text-5xl'>Store</h1>
                <form className='space-y-5 w-full'>
                    <div className='flex flex-col '>
                        <select name="storetype" id="type" placeholder='Store type' className='rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base'>
                            <option value="Mi Store">Mi Store</option>
                            <option value="Mi Home">Mi Home</option>
                        </select>
                        <input type="text" required placeholder='Store name' className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base' />
                        <input type="text" required placeholder='POS' className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base' />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Store