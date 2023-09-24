// @ts-nocheck
import Code from '@editorjs/code';
import Header from '@editorjs/header';
import List from '@editorjs/list';

export const tools = {
	header: {
		class: Header,
		config: {
			levels: [2, 3, 4, 5, 6],
			defaultLevel: 2,
		},
	},
	code: Code,
	list: List,
};
