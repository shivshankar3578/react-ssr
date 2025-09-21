import { ChangeEvent, memo, useContext, useMemo, useState } from 'react';
import type { Item } from '../app.types';

export const List = memo(({ // shoudn't render onchange parent form
    items,
    editItem,
}: {
    items: Item[];
    editItem: (item: Item) => void;
}) => {
    const [sortBy, setSortBy] = useState<"asc" | "desc" | "">("");
    const sortedItems = useMemo(() => {
        if (!sortBy) return items;
        return [...items].sort((a, b) => {
            if (sortBy === "asc") return a.dueDays - b.dueDays;
            return b.dueDays - a.dueDays;
        });
    }, [items, sortBy]);

    const toggleSort = () => {
        setSortBy(prev =>
            prev === "asc" ? "desc" : prev === "desc" ? "" : "asc"
        );
    };
    ;

    console.log("list rendered")
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Title</td>
                        <td>Due Days
                            <b className={`icon ${sortBy ? "active" : ""}`} onClick={toggleSort}>
                                {sortBy === "asc" ? "↑" : sortBy === "desc" ? "↓" : "↕"}
                            </b>
                        </td>
                        <td>Due Date</td>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map((item, index) => {
                        return <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{item.title} <b className='icon' onClick={() => editItem(item)} >&#x270e;</b></td>
                            <td>{item.dueDays}</td>
                            <td>{item.dueDate}</td>
                        </tr>
                    })
                    }
                </tbody>
            </table>
        </>
    )
});
