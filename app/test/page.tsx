'use client'
import { create } from './action'


export default function Page() {

    return (
        <div>
            <button type="button" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 " onClick={create}>
                Sign out
            </button>
            <div>Haloo</div>
        </div>


    )

}