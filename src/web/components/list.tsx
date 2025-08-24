import type { Item } from '../app.types';

export const List = ({
    items,
    onSelect,
}: {
    items: Item[];
    onSelect: (item: Item) => void;
}) => (
    <table>
        <thead>
            <tr>
                <td>#</td>
                <td>Title</td>
                <td>Due Date</td>
            </tr>
        </thead>
        <tbody>
            {items.map((item, index) => (
                <tr key={index} >
                    <td>{index + 1}</td>
                    <td>{item.title} <b className='pencil' onClick={() => onSelect(item)} >&#x270e;</b></td>
                    <td>{item.dueDate}</td>
                </tr>
            ))}
        </tbody>
    </table>
);