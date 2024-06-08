import { restoreTrip } from './restoreTrip';

describe('restoreTrip', () => {

	// Test for a valid set of tickets
	test('restores the trip correctly for a valid set of tickets', () => {
		expect(restoreTrip([
			{ source: 'Amsterdam', destination: 'Berlin' },
			{ source: 'Paris', destination: 'London' },
			{ source: 'London', destination: 'Amsterdam' }
		])).toBe('Paris, London, Amsterdam, Berlin');
	});

	test('restores the trip correctly for a simple linear trip', () => {
		expect(restoreTrip([
			{ source: 'A', destination: 'B' },
			{ source: 'B', destination: 'C' },
			{ source: 'C', destination: 'D' }
		])).toBe('A, B, C, D');
	});

	test('restores the trip correctly for a single ticket', () => {
		expect(restoreTrip([{ source: 'A', destination: 'B' }])).toBe('A, B');
	});

	// Test for no tickets provided
	test('throws an error when no tickets are provided', () => {
		expect(() => restoreTrip([])).toThrow('No tickets provided');
	});

	// Test for invalid ticket format
	test('throws an error for invalid ticket format', () => {
		expect(() => restoreTrip([{ source: 'A', destination: '' }])).toThrow('Invalid ticket: each ticket must have a source and a destination');
	});

	// Test for multiple starting points
	test('throws an error for multiple starting points', () => {
		expect(() => restoreTrip([
			{ source: 'A', destination: 'B' },
			{ source: 'C', destination: 'D' }
		])).toThrow('Invalid tickets: multiple starting points found, indicating disjoint trips');
	});

	// Test for conflicting tickets
	test('throws an error for conflicting tickets', () => {
		expect(() => restoreTrip([
			{ source: 'A', destination: 'B' },
			{ source: 'A', destination: 'C' }
		])).toThrow('Conflicting tickets: A has multiple destinations');
	});

	// Test for circular route
	test('throws an error for a simple circular route', () => {
		expect(() => restoreTrip([
			{ source: 'A', destination: 'B' },
			{ source: 'B', destination: 'A' }
		])).toThrow('Invalid tickets: circular route detected');
	});

	// Test for complex circular route
	test('throws an error for a complex circular route', () => {
		expect(() => restoreTrip([
			{ source: 'A', destination: 'B' },
			{ source: 'B', destination: 'C' },
            { source: 'C', destination: 'A' }
		])).toThrow('Invalid tickets: circular route detected');
	});

	// Test for redundant tickets
	test('throws an error for redundant tickets', () => {
		expect(() => restoreTrip([
            { source: 'A', destination: 'B' },
            { source: 'B', destination: 'C' },
            { source: 'B', destination: 'C' }
		])).toThrow('Invalid tickets: the trip does not cover all provided tickets');
	});
});