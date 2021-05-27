import React, { useState } from 'react';
import Block from '../Block';
import initialBlocks from './initialData';
import success from './successData';

import './index.css';

export default function Board() {
	const [blocks, setBlocks] = useState(initialBlocks);

	const handleClick = (row, col, number) => {
		let emptySpace = {};
		let canMove = false;

		blocks.forEach((v, i) => {
			v.forEach((block, j) => {
				if (!block) {
					emptySpace.row = i;
					emptySpace.col = j;
				}
			});
		});

		const rowIndex = emptySpace.row;
		const columnIndex = emptySpace.col;

		const blocksYouCanMove = [
			[rowIndex - 1, columnIndex],
			[rowIndex, columnIndex - 1],
			[rowIndex + 1, columnIndex],
			[rowIndex, columnIndex + 1],
		];

		blocksYouCanMove.forEach((possibility) => {
			if (row === possibility[0] && col === possibility[1]) {
				canMove = true;
			}
		});

		if (canMove) {
			const nextBlocks = [...blocks];

			nextBlocks[row][col] = null;

			nextBlocks[rowIndex][columnIndex] = number;

			setBlocks(nextBlocks);
		}

		if (checkSuccess()) {
			alert('Game over!');
		}
	};

	const checkSuccess = () => {
		let gameOver = true;
		blocks.forEach((row, i) => {
			row.forEach((col, j) => {
				if (col !== success[i][j]) {
					gameOver = false;
				}
			});
		});
		return gameOver;
	};

	return (
		<div className='board'>
			{blocks.map((row, i) =>
				row.map((value, j) => (
					<Block
						key={value}
						row={i}
						col={j}
						handleClick={handleClick}
						number={value}
					/>
				)),
			)}
		</div>
	);
}
