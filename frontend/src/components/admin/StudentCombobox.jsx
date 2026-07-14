import React, { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'

export default function StudentCombobox({ students, value, onChange, placeholder = 'Search student...' }) {
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef(null)

    const selectedStudent = students.find((s) => String(s.id) === String(value))

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const filtered = query.trim() === ''
        ? students
        : students.filter((s) =>
            `${s.first_name} ${s.last_name}`.toLowerCase().includes(query.toLowerCase())
        )

    const handleSelect = (student) => {
        onChange(String(student.id))
        setQuery('')
        setIsOpen(false)
    }

    const handleClear = (e) => {
        e.stopPropagation()
        onChange('')
        setQuery('')
    }

    return (
        <div className="relative flex-1" ref={wrapperRef}>
            {selectedStudent && !isOpen ? (
                <div
                    onClick={() => setIsOpen(true)}
                    className="flex items-center justify-between px-3 py-2 text-sm border border-gray-300 rounded-lg cursor-pointer bg-white"
                >
                    <span className="text-gray-900 font-medium truncate">
                        {selectedStudent.first_name} {selectedStudent.last_name}
                    </span>
                    <button onClick={handleClear} className="p-0.5 text-gray-400 hover:text-red-500 shrink-0 ml-2">
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        placeholder={placeholder}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                </div>
            )}

            {isOpen && (
                <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                    {filtered.length > 0 ? (
                        filtered.map((student) => (
                            <div
                                key={student.id}
                                onClick={() => handleSelect(student)}
                                className="px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer"
                            >
                                {student.first_name} {student.last_name}
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-sm text-gray-400">No matches found.</div>
                    )}
                </div>
            )}
        </div>
    )
}