import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get('conversation') as File;

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}

		const formDataToSend = new FormData();
		formDataToSend.append('conversation', file);

		// Forward to Python backend
		const pythonResponse = await fetch('http://localhost:5001/api/analyze', {
			method: 'POST',
			body: formDataToSend,
		});

		if (!pythonResponse.ok) {
			const errorData = await pythonResponse.json();
			return NextResponse.json(errorData, { status: pythonResponse.status });
		}

		const results = await pythonResponse.json();
		return NextResponse.json(results);
	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
