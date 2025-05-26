'use client';
import { useState } from 'react';
import { FileText, BarChart3, Users, Brain, AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import { EmotionCard, FallacyCard, InfluenceCard, StatCard } from '@/components/Card';

export default function ConversationAnalyzer() {
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<any>(null);
	const [error, setError] = useState('');

	const handleFileUpload = (event: any) => {
		const uploadedFile = event.target.files[0];
		if (uploadedFile) {
			if (uploadedFile.type === 'application/json' || uploadedFile.name.endsWith('.json')) {
				setFile(uploadedFile);
				setError('');
			} else {
				setError('Please upload a JSON file');
				setFile(null);
			}
		}
	};

	const analyzeConversation = async () => {
		if (!file) return;

		setLoading(true);
		setError('');

		try {
			const formData = new FormData();
			formData.append('conversation', file);

			const response = await fetch('/api/analyze', { method: 'POST', body: formData });
			if (!response.ok) throw new Error('Analysis failed');

			const data = await response.json();
			setResults(data);
		} catch (err) {
			setError('Failed to analyze conversation. Please try again.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.1)_1px,transparent_0)] [background-size:32px_32px]"></div>

			<div className="relative lg:mx-auto min-w-screen lg:min-w-auto py-16 px-12 lg:px-8 lg:py-0 container max-w-7xl">
				<div className="min-h-screen flex flex-col lg:flex-row items-center lg:gap-16 gap-12">
					{/* Header */}
					<div className="w-full lg:w-2xl z-10">
						<div className="space-y-6 text-center lg:text-start">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg">
								<div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
								<span className="text-sm font-medium text-slate-700">AI-Powered Analysis</span>
							</div>

							<h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 tracking-tight">
								Convolens
							</h1>
							<h2 className="text-2xl font-semibold text-slate-700 -mt-2">
								Influence + Persuasion Analyzer
							</h2>
							<p className="text-lg text-slate-600 leading-relaxed max-w-lg">
								Upload your conversation data to analyze influence patterns, detect logical
								fallacies, and understand persuasion tactics in group discussions.
							</p>
						</div>
					</div>

					{/* Upload Section */}
					<div className="w-full max-w-lg z-10">
						<div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
							<div className="text-center space-y-6">
								<div className="relative group">
									<div className="border-2 border-dashed border-slate-300 group-hover:border-blue-400 rounded-2xl p-8 transition-all duration-300 bg-gradient-to-br from-white/50 to-slate-50/50">
										<input
											type="file"
											accept=".json"
											onChange={handleFileUpload}
											className="hidden"
											id="file-upload"
										/>
										<label
											htmlFor="file-upload"
											className="cursor-pointer flex flex-col items-center space-y-4">
											<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
												<FileText className="w-8 h-8 text-white" />
											</div>
											<div className="space-y-2">
												<p className="font-semibold text-slate-800">
													{file ? file.name : 'Select JSON File'}
												</p>
												<p className="text-sm text-slate-500">Drag and drop or click to browse</p>
											</div>
										</label>
									</div>
								</div>

								{error && (
									<div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-4">
										<p className="text-red-700 font-medium">{error}</p>
									</div>
								)}

								<button
									onClick={analyzeConversation}
									disabled={!file || loading}
									className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
									{loading ? (
										<div className="flex items-center justify-center space-x-2">
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
											<span>Analyzing...</span>
										</div>
									) : (
										'Analyze Conversation'
									)}
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Results Section */}
				{results && (
					<div className="space-y-12 mt-16 lg:pb-16">
						{/* Overview Stats */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<StatCard
								icon={Users}
								title="Total Speakers"
								value={results.overview?.total_speakers || 0}
							/>
							<StatCard
								icon={BarChart3}
								title="Total Messages"
								value={results.overview?.total_messages || 0}
							/>
							<StatCard
								icon={AlertTriangle}
								title="Fallacies Detected"
								value={results.overview?.total_fallacies || 0}
								color="red"
							/>
							<StatCard
								icon={Brain}
								title="Avg Influence Score"
								value={`${Math.round(results.overview?.avg_influence) || 0}%`}
								color="purple"
							/>
						</div>

						{/* Influence Rankings */}
						<div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
							<div className="flex items-center mb-8 space-x-3">
								<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
									<TrendingUp className="w-6 h-6 text-white" />
								</div>
								<h2 className="text-3xl font-bold text-slate-800">Influence Rankings</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{results.influence_scores?.map((speaker: any, idx: any) => (
									<InfluenceCard
										key={idx}
										speaker={speaker.speaker}
										score={Math.round(speaker.score * 100)}
										tactics={speaker.tactics}
									/>
								))}
							</div>
						</div>

						{/* Logical Fallacies */}
						{results.fallacies && Object.keys(results.fallacies).length > 0 && (
							<div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
								<div className="flex items-center mb-8 space-x-3">
									<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
										<AlertTriangle className="w-6 h-6 text-white" />
									</div>
									<h2 className="text-3xl font-bold text-slate-800">Logical Fallacies Detected</h2>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{Object.entries(results.fallacies).map(([type, data]: [string, any]) => (
										<FallacyCard
											key={type}
											type={type.replaceAll('_', ' ').toUpperCase()}
											count={data.count}
											examples={data.examples}
										/>
									))}
								</div>
							</div>
						)}

						{/* Emotion Analysis */}
						{results.emotions && (
							<div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
								<div className="flex items-center mb-8 space-x-3">
									<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
										<Eye className="w-6 h-6 text-white" />
									</div>
									<h2 className="text-3xl font-bold text-slate-800">Emotional Tone Analysis</h2>
								</div>
								<div className="space-y-6">
									{Object.entries(results.emotions).map(([speaker, emotions]) => (
										<div
											key={speaker}
											className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/30">
											<h4 className="font-bold text-slate-800 mb-4 text-lg">{speaker}</h4>
											<div className="flex flex-wrap gap-3">
												{Object.entries(emotions as Record<string, number>).map(
													([emotion, score]) => (
														<EmotionCard key={emotion} emotion={emotion} score={score} />
													)
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
