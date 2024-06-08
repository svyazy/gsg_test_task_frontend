export type Ticket = {
	source: string,
	destination: string
}

export function restoreTrip(tickets: Array<Ticket>): string {
	if (tickets.length === 0) throw new Error('No tickets provided');

	const graph = new Map<string, string>();
	const graphStart = new Map<string, number>();

	// Validate input and build the graph
	for (const ticket of tickets) {
		// Check both source and destination are provided and not empty
		if (!ticket.source || !ticket.destination) {
			throw new Error('Invalid ticket: each ticket must have a source and a destination');
		}

		if (graph.has(ticket.source) && graph.get(ticket.source) !== ticket.destination) {
			throw new Error(`Conflicting tickets: ${ticket.source} has multiple destinations`);
		}

		graph.set(ticket.source, ticket.destination);
		graphStart.set(ticket.destination, (graphStart.get(ticket.destination) || 0) + 1);
		if (!graphStart.has(ticket.source)) graphStart.set(ticket.source, 0);
	}

	// Find the starting points (cities with no incoming edges)
	const startCities = [];
	for (const [city, count] of graphStart.entries()) {
		if (count === 0) {
			startCities.push(city);
		}
	}

	// Handle cases where there are multiple disjoint trips
	if (startCities.length !== 1) {
		// Additional check for circular routes
		throw new Error( !startCities.length
			? 'Invalid tickets: circular route detected'
			: 'Invalid tickets: multiple starting points found, indicating disjoint trips'
		);
	}

	const start = startCities[0];

	// Reconstruct the path and detect circular routes
	const trip: Array<string> = [];
	const visited = new Set<string>();
	let currentCity = start;

	while (currentCity) {
		if (visited.has(currentCity)) {
			throw new Error('Invalid tickets: circular route detected');
		}
		visited.add(currentCity);
		trip.push(currentCity);
		currentCity = graph.get(currentCity) || '';
	}

	// Ensure the path covers all tickets
	if (trip.length !== tickets.length + 1) {
		throw new Error('Invalid tickets: the trip does not cover all provided tickets');
	}

	return trip.join(', ');
}
