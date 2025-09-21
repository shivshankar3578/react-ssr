import { createContext, memo, useCallback, useContext, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { defaultState, type Item } from './app.types';
import { List } from './components/list';

export const ThemeContext = createContext({ isDark: false, toggleTheme: () => { } });
const ThemeProvider = ({ children }: any) => {
    const [isDark, setDarkTheme] = useState(false);
    const toggleTheme = useCallback(() => {
        document.documentElement.classList.toggle("dark");
        setDarkTheme(prevTheme => !prevTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }} >
            {children}
        </ThemeContext.Provider>
    )

}

export default function App(props: { items?: Item[] }) {
    return (
        <ThemeProvider>
            <Home items={props.items} />
        </ThemeProvider>
    )
}

function Home(props: { items?: Item[] }) {
    const [formdata, setFormdata] = useState<Item>(defaultState);
    const [error, setError] = useState('');
    const [items, setItem] = useState<Item[]>(props.items || []);
    const titleRef = useRef<HTMLInputElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!value.trim()) setError(`${name} can't be empty`);
        let dueDays = formdata.dueDays || 0
        if (name === 'dueDate') {
            const due = new Date(value);
            const diffTime = due.getTime() - new Date().getTime();
            dueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        }
        setFormdata((prev) => ({ ...prev, [name]: value, dueDays }));

    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formdata.title?.trim() && formdata.dueDate?.trim()) {
            titleRef.current?.focus(); // Focus input
            if (!formdata.id) formdata.id = new Date().getTime()
            setItem([formdata, ...items.filter(item => item.id !== formdata.id)]);
            setFormdata(defaultState)
            setError('')
        } else {
            setError('Both fields are required');
        }
    };
    const resetDate = () => {
        setFormdata({ ...formdata, dueDate: null, })
    }
    const editItem = useCallback((item: Item) => {
        setFormdata(item)
        titleRef.current?.focus(); // Focus input
    }, [])
    const { isDark, toggleTheme } = useContext(ThemeContext)

    console.log("app rendered")
    return (
        <>
            <a style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }} onClick={toggleTheme}> {isDark ? "🌙" : "🌞"} </a>
            <div className="row">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <input
                            name="title"
                            value={formdata.title}
                            placeholder='Title'
                            onChange={onChange}
                            ref={titleRef}
                        />
                        <div className='row'>
                            <input
                                type="date"
                                name="dueDate"
                                value={formdata.dueDate || ''}
                                onChange={onChange}
                            />
                            <span className='date-reset' onClick={resetDate}>&times;</span>
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

            <List items={items} editItem={editItem} />
        </>
    )
}