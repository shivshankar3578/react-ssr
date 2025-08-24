import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { defaultState, type Item } from './app.types';
import { List } from './components/list';

export default function App(props: { items?: Item[] }) {
    const [formdata, setFormdata] = useState<Item>(defaultState);
    const [error, setError] = useState('');
    const [items, setItem] = useState<Item[]>(props.items || []);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setError(value.trim() ? '' : `${name} can't be empty`);
        let dueDays = 0
        if (name === 'dueDate') {
            const due = new Date(value);


            // if (isNaN(due.getTime())) {
            //     return <div>Invalid due date</div>;
            // }
            // setError(value.trim() ? '' : `${name} can't be empty`);

            const diffTime = due.getTime() - new Date().getTime();
            dueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        }
        setFormdata((prev) => ({ ...prev, [name]: value, dueDays }));

    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formdata.title?.trim() && formdata.dueDate.trim()) {
            setItem([...items, formdata]);
        } else {
            setError('Both fields are required');
        }
    };
    return (
        <>
            <div className="row">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <input
                            name="title"
                            value={formdata.title}
                            placeholder='Title'
                            onChange={onChange}
                        />
                        <div className='row'>
                            <input
                                type="date"
                                name="dueDate"
                                value={formdata.dueDate}
                                onChange={onChange}
                            />
                            <span style={{ flexShrink: 0 }}>due in {formdata.dueDays} days</span>
                        </div>
                        <div className="row">
                            <p className="error">{error}</p>
                            <button type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <List items={items} onSelect={(item) => setFormdata(item)} />
        </>
    )
}