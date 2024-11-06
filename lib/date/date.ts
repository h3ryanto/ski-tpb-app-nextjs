import { vercelStegaSplit } from '@vercel/stega';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function formatDate(datestring: string) {
	const { cleaned, encoded } = vercelStegaSplit(datestring);
	const date = new Date(cleaned);
	return `${date}${encoded}`;
}


