import "./App.css";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
	const [itemText, setItemText] = useState('');
	const [listItems, setListItems] = useState([]);
	const [isUpdating, setIsUpdating] = useState('');
	const [updateItemText, setUpdateItemText] = useState('');

	const inputRef = useRef();
	const updateInputRef = useRef();

	const addTodoItem = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post("https://todo-app-api-qeg4.onrender.com/v1/api/item", { item: itemText });
			setListItems(prev => [...prev, res.data]);
			setItemText('');
			inputRef.current.focus();
		} catch (err) {
			console.log(err);
		}
	};

	const deleteItem = async (id) => {
		try {
			await axios.delete(`https://todo-app-api-qeg4.onrender.com/v1/api/item/${id}`);
			const newListItem = listItems.filter(item => item._id !== id);
			setListItems(newListItem);
		} catch (err) {
			console.log(err);
		}
	}

	const updateItem = async (e) => {
		e.preventDefault();

		try {
			await axios.put(`https://todo-app-api-qeg4.onrender.com/v1/api/item/${isUpdating}`, { item: updateItemText });
			const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
			const updatedItem = listItems[updatedItemIndex].item = updateItemText;
			setUpdateItemText('');
			setIsUpdating('');
			updateInputRef.current.focus();
		} catch (err) {
			console.log(err);
		}
	};

	const renderUpdataField = () => {
		return (
			<form className="update-form" onSubmit={e => updateItem(e)}>
				<input
					className="update-new-input"
					type='text'
					placeholder="new todo"
					onChange={e => setUpdateItemText(e.target.value)}
					value={updateItemText}
					ref={updateInputRef}
				/>
				<button className="update-new-btn">Update</button>
			</form>
		);
	};

	useEffect(() => {
		const getItemList = async () => {
			try {
				const res = await axios.get("https://todo-app-api-qeg4.onrender.com/v1/api/items");
				setListItems(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getItemList();
	}, []);

	return (
		<div className="App">
			<h1>Todo list</h1>
			<form className='form' onSubmit={e => addTodoItem(e)}>
				<input
					ref={inputRef}
					type='text'
					value={itemText}
					placeholder='add todo'
					onChange={e => setItemText(e.target.value)}
				/>
				<button type='submit'>Add</button>
			</form>
			<div className='todo-listItems'>
				{
					listItems.map((item, index) => (
						<div key={index} className='todo-item'>
							{
								isUpdating === item._id ?
								renderUpdataField() :
								<>
									<p className='item-content'>{item.item}</p>
									<button
										className='update-item'
										onClick={() => setIsUpdating(item._id)}
									>
										Update
									</button>
									<button
										className='delete-item'
										onClick={() => deleteItem(item._id)}
									>
										Delete
									</button>
								</>
							}
						</div>
					))
				}
			</div>
		</div>
	);
}

export default App;
