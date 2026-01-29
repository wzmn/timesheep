'use client'
import Link from 'next/link';
import DataTable, { TableColumn } from 'react-data-table-component';
import { getWorkingDatesOfWeek } from "@/lib/time"
import { useEffect, useState } from 'react';

const handleEdit = (week: number) => {
    console.log(`Edit button clicked for week ${week}`);
}


interface DataRow {
    week: number;
    date: string;
    hours: number;
}
const conditionalCellStyles = [
    {
        when: (cell: DataRow) => cell.hasOwnProperty('week'),
        style: {
            backgroundColor: '#f9fafb',
        },
    },
];

const columns: TableColumn<DataRow>[] = [
    {
        conditionalCellStyles: conditionalCellStyles,
        name: 'WEEK#',
        width: '100px',
        selector: (row) => row.week,
        sortable: true,
    },
    {
        name: 'DATE',
        selector: row => {
            const result = getWorkingDatesOfWeek(row.week, 2026);
            return result[0].toDateString() + ' - ' + result[result.length - 1].toDateString()
        },
        sortable: true,
    },
    {
        name: 'STATUS',
        cell: (row) => {
            if (row.hours === 0) {
                return <span className="inline-flex items-center rounded-md bg-pink-200/40 px-2 py-1 text-xs font-medium text-pink-800">MISSING</span>;
            }
            if (row.hours >= 40) {
                return <span className="inline-flex items-center rounded-md bg-green-200/40 px-2 py-1 text-xs font-medium text-green-800">COMPLETED</span>;
            }
            return <span className="inline-flex items-center rounded-md bg-yellow-200/40 px-2 py-1 text-xs font-medium text-yellow-800">INCOMPLETE</span>;
        },
        sortable: true,
    },
    {
        name: 'ACTIONS',
        width: '100px',
        cell: (row) => {
            if (row.hours === 0) {
                return <div className="flex gap-2"><Link className='text-blue-600 cursor-pointer text-center' href={`/dashboard/week/${row.week}`}>CREATE</Link></div>;
            }
            if (row.hours >= 40) {
                return <div className="flex gap-2"><Link className='text-blue-600 cursor-pointer text-center' href={`/dashboard/week/${row.week}`}>VIEW</Link></div>;
            }
            return <div className="flex gap-2"><Link className='text-blue-600 cursor-pointer text-center' href={`/dashboard/week/${row.week}`}>UPDATE</Link></div>;
        },
    },
];

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#f9fafb',
        },
    },
};

interface DataCell {
    week: number;
    date: string;
    hours: number;
}

const data: DataCell[] = [
    {
        week: 1,
        date: '1 - 2 January, 2026',
        hours: 40,
    },
    {
        week: 2,
        date: '5 - 9 January, 2026',
        hours: 0,
    },
    {
        week: 3,
        date: 'Beetlejuice',
        hours: 35,
    },
    {
        week: 4,
        date: 'Ghostbusters',
        hours: 0,
    },
]

const MyTable = function () {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        
            <DataTable
                title="Your Timesheets"
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
            />
        
    )
}

export default MyTable;