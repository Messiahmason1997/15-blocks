import React from 'react';

export default function Block({ number, handleClick, row, col }) {
	return (
		<div onClick={() => handleClick(row, col, number)} className='block'>
			<h1>{number}</h1>
		</div>
	);
}
